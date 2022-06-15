import { Cookie } from "./cookie.js";
import Delete from "./delete.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "./https.js";
import Origin  from "./lib-origin.js";
import { View } from "./view.js";

window.onload = function(e) {

    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const origin = new Origin();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const token = `Bearer ${cookie.get("Authentic")}`;

    let type = origin.parameter().type;
    environment.payload.type = "Find";

    const recycle = (function() {
        let endpoint = "";
        let options = {};

        function setChecked() {
            const Restore = $("#restore");
            const ParentRecycle = $("#parent-recycle");
            const ItemsRecycle = Array.from($$(".childrens-recycle"));

            ParentRecycle.addEventListener("change", function(e) {
                let _this = this;
                (_this.checked)? Restore.removeAttribute("disabled") : Restore.setAttribute("disabled", true);
                ItemsRecycle.forEach((recycle) => {
                    recycle.checked = _this.checked;
                })
            })

            ItemsRecycle.forEach((recycle) => {
                recycle.addEventListener("change", function(e) {
                    if(ItemsRecycle.every((item) => item.checked === false)) {
                        Restore.setAttribute("disabled", true);

                    } else if(ItemsRecycle.some((item) => item.checked === false)) {
                        ParentRecycle.checked = false;
                        Restore.removeAttribute("disabled");

                    } else {
                        ParentRecycle.checked = true;
                    }
                })
            })
        }

        return {
            config: function() {
                switch(type) {
                    case "user":
                    default:
                        endpoint = environment.endpoint.user;
                        Object.assign(options, environment.options.user);
                        break;
                }
            },

            render: function() {
                https.FIND(environment.payload, token, endpoint)
                .then((result) => {
                    view.Render({
                        ...options,
                        Body: "#Body",
                        Blank: "#Blank",
                        Header: "#Header",
                        Result: result,
                        Type: "Recycle",
                    });
                })
                .then(() => {
                    deleted.really($$(".delete"), endpoint, type);
                })
                .then(() => {
                    setChecked();
                })
                .catch((err) => {
                    throw err;
                })
            }
        }
    })()

    recycle.config();
    recycle.render();
}