import { httpsService } from "../commons/httpService.js";
import { setCookie } from "../commons/common.js";
import { Validation } from "../commons/validation.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let email = $("#user-email");
    let password = $("#user-password");
    let signInForm = $("#user-login");

    Validation({
        form: "#user-login",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#user-email",
                guides: [Validation.required()]
            },
            {
                selector: "#user-password",
                guides: [Validation.required(), Validation.minLength(6), Validation.maxLength(15)]
            }
        ]
    });

    signInForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (this.valid) {
            if (email?.value && password?.value) {
                httpsService('API/user/user-login', 'POST', { "email": email?.value, password: password?.value })
                    .then((data) => {
                        return data.json();
                    })
                    .then((user) => {
                        if (user.status) {
                            saveUser(user);

                        } else {
                            valid(user);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    })

    function valid(data) {
        Validation({
            form: "#user-login",
            selectorError: ".form-message",
            type: "no-event",
            rules: [
                {
                    selector: "#user-email",
                    guides: [Validation.data(data)]
                },
                {
                    selector: "#user-password",
                    guides: [Validation.data(data)]
                }
            ]
        })
    }

    function saveUser(user) {
        setCookie("token", user.token);
        location.href = "/home";
    }
}