import { validation, resValidation } from './validation.js';

window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let url = location.href;
    // let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let loader = $$(".modal-loader")[0];
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
        loader.classList.add("active");

        if (email?.value && password?.value) {
            fetch(url + 'API/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email?.value, password: password?.value })
            })
                .then((res) => {
                    return res.json();
                })
                .then((user) => {
                    if (user.status) {
                        console.log(user);
                        saveUser(user);
                    } else {
                        resValidation(user, (status) => {
                            (status) ? loginForm.removeAttribute("disabled") : loginForm.setAttribute("disabled", true);
                        }, email, password);
                    }
                    loader.classList.remove("active");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    function saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
        location.href = "/home";
    }
}