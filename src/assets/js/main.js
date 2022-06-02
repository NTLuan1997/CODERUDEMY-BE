import { environment } from "./config/environment.js";
import { Cookie } from "./lib/cookie.js";
import { HTTPS } from "./commons/httpService.js";

window.onload = function (e) {
    const https = new HTTPS();
    const cookie = new Cookie();
    const $ = document.querySelector.bind(document);
    // const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const payload = {
        "Email": "",
        "Password": "",
        Type: "Manager"
    };

    $("#SignOut").addEventListener("click", function (e) {
        e.preventDefault();
        https.POST(token, payload, environment.endpoint.authentication)
        .then((result) =>  {
            console.log(result);
        })
        .catch((err) => {
            throw err;
        })

        // httpsService("API/user/user-signOut", "GET", null)
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((data) => {
        //         if (data.status) {
        //             location.href = "/";
        //         }
        //     })
        //     .catch((err) => {
        //         throw err;
        //     })
    })
}