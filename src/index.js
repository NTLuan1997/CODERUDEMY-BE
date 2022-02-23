const express = require('express')
const { engine } = require("express-handlebars")
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 3000

// Static File Paths
let Path = (function () {
    // Configuration path file.
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


// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: ".hbs",
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource\\views'))
app.get('/', (req, res) => {
    res.render("home")
})

app.get('/news', (req, res) => {
    res.render("news")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})