import { Cookie } from "../lib/cookie.js";
import Delete from "../lib/delete.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;

    const course = (function () {
        let endpoint = "";
        let options = {};
        let payload = {};

        if(localStorage.getItem("UnitToken")) {
            $("#Blank").classList.remove("active");
            payload.id = localStorage.getItem("UnitToken");
            payload.status = true;
            payload.type = "Find";

            return {
                config: function() {
                    endpoint = environment.endpoint.lesson;
                    Object.assign(options, environment.options.lesson);
                },

                render: function() {
                    https.FIND(payload, token, endpoint)
                    .then((result) => {
                        view.Render({
                            ...options,
                            Body: "#Body",
                            Blank: "#Blank",
                            Header: "#Header",
                            Result: result,
                            Type: "Basic",
                        });
                    })
                    .then(() => {
                        deleted.virtual($$(".delete"), endpoint, "lesson");
                    })
                    .catch((err) => {
                        throw err;
                    })
                },
            }
        } else {
            $("#Blank").classList.add("active");
        }
    })();

    course.config();
    course.render();
}