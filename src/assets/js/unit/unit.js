import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import Delete from "../lib/delete.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";
import Origin from "../lib/lib-origin.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const origin = new Origin();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;

    // function redirect() {
    //     $$(".lesson").forEach((unit) => {
    //         unit.addEventListener("click", function(e) {
    //             e.preventDefault();
    //             localStorage.setItem("UnitToken", this.dataset.id);
    //             window.location.href = "unit/lesson";
    //         })
    //     })
    // }

    const course = (function () {
        let endpoint = "";
        let options = {};
        let payload = {};

        if(localStorage.getItem("CourseToken")) {
            $("#Blank").classList.remove("active");
            payload.id = localStorage.getItem("CourseToken");
            payload.status = true;
            payload.type = "Find";

            return {
                config: function() {
                    endpoint = environment.endpoint.unit;
                    Object.assign(options, environment.options.unit);
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
                            Type: "LoadChildren",
                        });
                    })
                    .then(() => {
                        deleted.virtual($$(".delete"), endpoint, "unit");
                    })
                    .catch((err) => {
                        throw err;
                    })
                },

                router: function() {
                    $$(".redirect").forEach(function(element) {
                        element.innerHTML = "Bài học";
                        element.style.cursor = "pointer";

                        element.addEventListener("click", function(e) {
                            e.preventDefault();
                            localStorage.setItem("UnitToken", this.dataset.id);
                            window.location.href = "course/unit/lesson";
                        })
                    })
                }
            }

        } else {
            $("#Blank").classList.add("active");
        }
    })();

    course.config();
    course.render();
}