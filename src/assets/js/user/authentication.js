import { HTTPS } from "../commons/https.js";
import { Cookie } from "../lib/cookie.js";
import { Validation } from "../commons/validation.js";
import { environment } from "../config/environment.js";


window.onload = function (e) {
    const cookie = new Cookie();
    const https = new HTTPS();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let Email = $("#Email");
    let Password = $("#Password");
    let Authentication = $("#Authentication");

    Validation({
        form: "#Authentication",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#Email",
                guides: [Validation.required(), Validation.isEmail()]
            },
            {
                selector: "#Password",
                guides: [Validation.required(), Validation.minLength(6), Validation.maxLength(15)]
            }
        ]
    });

    Authentication.addEventListener("submit", function (e) {
        e.preventDefault();
        if (this.valid) {
            https.POST("Empty", setInputAuthentication(), environment.endpoint.authentication)
            .then((res) => {
                if(res) {
                    let {status, token} = res;
                    if(token) {
                        cookie.set("Authentic", `${token}`);
                        window.location.href = "/web";
                        
                    } else {
                        console.log("Dang nhap khong thanh cong");
                    }
                    
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    })

    function setInputAuthentication() {
        return {
            "Email": Email.value,
            "Password": Password.value,
            "Type": "Manager"
        }
    }

    function valid(data) {
        Validation({
            form: "#Authentication",
            selectorError: ".form-message",
            type: "no-event",
            rules: [
                {
                    selector: "#Email",
                    guides: [Validation.data(data)]
                },
                {
                    selector: "#Password",
                    guides: [Validation.data(data)]
                }
            ]
        })
    }
}