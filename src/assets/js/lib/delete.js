import { Cookie } from "./cookie.js";
// import { environment } from "../config/environment.js";
import { HTTPS } from "./https.js";
import Origin from "./lib-origin.js";
import { Permission } from "./permission.js";

const cookie = new Cookie();
const https = new HTTPS();
const origin = new Origin();
const permission = new Permission();
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let date = new Date();
let token = `Bearer ${cookie.get("Authentic")}`;
export default class Delete {
    payload = {
        Id: "",
        Status: false,
        Type: "",
        Func: ""
    }
    pathname = origin.page().pathname;

    constructor() { }

    virtual(element, endpoint, type) {
        let _this = this;
        this.payload.Type = "Virtual";
        this.payload.Func = "Delete"

        element.forEach(function(btn) {
            btn.addEventListener("click", function(e) {
                _this.payload.Id = this.dataset.id;
                https.DELETE(token, _this.payload, endpoint)
                .then((result) => {
                    if(result?.status) {
                        window.location.href = `${_this.pathname}/recycle?type=${type}`;
                    } else {
                        permission.setState(result);
                    }
                })
                .catch((err) => {
                    throw err;
                })
            })
        })
    }

    really(element, endpoint, type) {
        let _this = this;
        this.payload.Type = "Really";
        this.payload.Func = "Delete"

        element.forEach(function(btn) {
            btn.addEventListener("click", function() {
                _this.payload.Id = this.dataset.id;
                https.DELETE(token, _this.payload, endpoint)
                .then((result) => {
                    if(result?.status) {
                        window.location.reload();
                    } else {
                        permission.setState(result);
                    }
                })
                .catch((err) => {
                    throw err;
                })
            })
        })
    }
}