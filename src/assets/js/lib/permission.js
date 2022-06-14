import {environment} from "../config/environment.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export class Permission {
    permission = $("#permission");

    constructor() { }

    setState(result) {
        if(result.hasOwnProperty("type")) {
            permission.innerHTML = this.mapper(result?.type);
            permission.classList.add("active");

            setTimeout(() => {
                permission.classList.remove("active");
            }, 3500);
        }
    }

    mapper(type) {
        let message = "";
        switch(type) {

            case "register-already":
                message = environment.permission.registerAlready;
                break;

            case "token-blank":
                message = environment.permission.tokenBlank;
                break;

            case "token-expired":
                message = environment.permission.tokenExpired;
                break;

            case "missing-permission":
            default:
                message = environment.permission.missingPermission;
                break;
        }

        return message;
    }


}