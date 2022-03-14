const express = require('express');
const { engine } = require("express-handlebars");
const session = require('express-session');
// const router = require("./routers/routers");
const routerApiModule = require("./routers/api/routerModule");
const routerRenderModule = require("./routers/render/routerModule");
// const user = require("./app/middleware/userMiddleware");

// const morgan = require('morgan');
const path = require('path');
const app = express();
// const port = 3000;
const PORT = process.env.PORT || 3000;

// Static File Paths
let Path = (function () {
    let resource = __dirname.split("\\");
    let resource_length = resource.length;

    let derectory = resource.reduce((acc, curr, currIndex) => {
        if (Array.isArray(acc)) {
            if ((resource_length - 1) != currIndex) {
                return acc.concat(curr);
            }
        }
        return acc;
    }, []).join("\\")

    return {
        getPath() {
            return derectory;
        }
    }
}())

app.use('/static', express.static(path.join(__dirname, 'assets')))
app.use("/css", express.static(path.join(Path.getPath(), '/node_modules/bootstrap/dist/css')))
app.use("/jquery", express.static(path.join(Path.getPath(), '/node_modules/jquery/dist')))
app.use("/js", express.static(path.join(Path.getPath(), '/node_modules/bootstrap/dist/js')))

// Middleware giúp bắt dữ liệu submit từ form lên || được gưiửi qua Ajax.
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// HTTP Logger
// app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: ".hbs",
    helpers: {
        setChecked: (type, status) => {
            if (type == "action") {
                if (status == "action") return "checked";
                return null;

            } else {
                if (status == "no-action") return "checked";
                return null;
            }
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource/views'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


// Router init
routerRenderModule(app);
routerApiModule(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`, app.settings.env);
})