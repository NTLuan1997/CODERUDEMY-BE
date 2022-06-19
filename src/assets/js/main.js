import { Cookie } from "./lib/cookie.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    $("#SignOut").addEventListener("click", function (e) {
        e.preventDefault();
        cookie.remove("Authentic");
        localStorage.clear();
        window.location.href = "/";
    })
}