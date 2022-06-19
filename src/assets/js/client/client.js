import { Cookie } from "../lib/cookie.js";
import  Delete from "../lib/delete.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const view = new View();
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "Limited";
    environment.payload.start = 0;
    environment.payload.limited = 10;

    const client = (function () {
        let endpoint = "";
        let options = {};

        return {
            config: function() {
                endpoint = environment.endpoint.client;
                Object.assign(options, environment.options.client);
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
                        Type: "Basic",
                    });
                })
                .then(() => {
                    deleted.virtual($$(".delete"), environment.endpoint.client, "client");
                })
                .catch((err) => {
                    throw err;
                })
            }
        }
    })();

    client.config();
    client.render();
}