import { httpsService } from "./commons/httpService.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);

    $("#user-signout").addEventListener("click", function (e) {
        console.log(Date.now());
        httpsService("API/user/user-signOut", "GET", null)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.status) {
                    location.href = "/";
                }
            })
            .catch((err) => {
                throw err;
            })
    })
}