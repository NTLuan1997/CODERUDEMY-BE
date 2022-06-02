import { environment } from "./config/environment.js";
import { Cookie } from "./lib/cookie.js";
import { HTTPS } from "./commons/httpService.js";

window.onload = function (e) {
    const https = new HTTPS();
    const cookie = new Cookie();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    $("#SignOut").addEventListener("click", function (e) {
        e.preventDefault();
        cookie.remove("Authentic");
        window.location.href = "/";
    })
}