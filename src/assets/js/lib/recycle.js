import { Cookie } from "./cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "./https.js";
import Origin  from "./lib-origin.js";
import { View } from "./view.js";

window.onload = function(e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;

    environment.payload.type = "Find";
    let type = origin.parameter().type;
    let endpoint = "";

    (function() {
        switch(type) {
            case "user":
            default:
                endpoint = environment.endpoint.user;
                break;
        }

        https.FIND(environment.payload, token, endpoint)
        .then((result) => {
            view.Render({
                Body: "#Body",
                Blank: "#Blank",
                DocumentKeys: ["Name", "Email", "DateOfBirth", "Role", "Status"],
                Header: "#Header",
                HeaderTitles: ["Họ và tên", "Email", "Ngày/Tháng/Năm sinh", "Quyền", "Trạng thái"],
                Result: result,
                Type: "Recycle"
            });
        })
        .catch((err) => {
            throw err;
        })



    }())
}