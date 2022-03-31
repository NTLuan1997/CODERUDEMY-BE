import { validation, resValidation } from '../commons/validation.js';
import { httpsService } from "../commons/httpService.js";
import { setCookie } from "../commons/common.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let email = $("#user_email");
    let password = $("#user_password");
    let loginForm = $("#user_login");

    (function () {
        loginForm.setAttribute("disabled", true);
        password.setAttribute("disabled", true);

        email.addEventListener("keyup", function (e) {
            validation("email", this, (status) => {
                (status) ? password.removeAttribute("disabled") : password.setAttribute("disabled", true);
            });
        })

        password.addEventListener("keyup", function (e) {
            validation("password", this, (status) => {
                (status) ? loginForm.removeAttribute("disabled") : loginForm.setAttribute("disabled", true);
            });
        })

    }());

    loginForm.addEventListener("click", function (e) {
        e.preventDefault();
        if (email?.value && password?.value) {
            httpsService('API/user/login', 'POST', { "email": email?.value, password: password?.value })
                .then((data) => {
                    return data.json();
                })
                .then((user) => {
                    if (user.status) {
                        saveUser(user);
                    } else {
                        resValidation(user, (status) => {
                            (status) ? loginForm.removeAttribute("disabled") : loginForm.setAttribute("disabled", true);
                        }, email, password);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    function saveUser(user) {
        setCookie("token", user.token);
        location.href = "/home";
    }
}