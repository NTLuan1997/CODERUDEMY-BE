import { Cookie } from "./cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "./https.js";
import Origin from "./lib-origin.js";
import { Priture } from "./priture.js";
import { Permission } from "./permission.js";

const cookie = new Cookie();
const https = new HTTPS();
const origin = new Origin();
const priture = new Priture();
const permission = new Permission();
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// let date = new Date();
let token = `Bearer ${cookie.get("Authentic")}`;
export default class Delete {
    payload = {
        Id: "",
        Status: false,
        Type: "",
        Func: ""
    }
    pathname = origin.page().pathname;
    thumbnail = "";

    constructor() { }

    virtual(element, endpoint, type) {
        let _this = this;
        this.payload.Type = "Virtual";
        this.payload.Func = "Delete";

        element.forEach(function(btn) {
            btn.addEventListener("click", function(e) {
                if(this.dataset.hasOwnProperty("amount") && !!(Number(this.dataset?.amount))) {
                    permission.setState({type: "content-Linked"});

                } else if(this.dataset.hasOwnProperty("register") && !!(Number(this.dataset?.register))) {
                    permission.setState({type: "course-registered"});

                } else {
                    _this.payload.Id = this.dataset.id;
                    _this.exec(endpoint)
                    .then((result) => {
                        (result?.status)? window.location.href = `${_this.pathname}/recycle?type=${type}` : permission.setState(result);
                    })
                    .catch((err) => {
                        throw err;
                    })
                }
            })
        })
    }

    really(element, endpoint) {
        let _this = this;
        this.payload.Type = "Really";
        this.payload.Func = "Delete"

        element.forEach(function(btn) {
            btn.addEventListener("click", function() {
                _this.payload.Id = this.dataset.id;

                if(this.dataset.thumbnail) {
                    priture.delete(environment.priture.url, this.dataset.thumbnail)
                    .then((result) => {
                        if(result?.status) {
                            return _this.exec(endpoint);
                        }
                    })
                    .then((result) => {
                        (result?.status)? window.location.reload() : permission.setState(result);
                    })
                    .catch((err) => {
                        throw err;
                    })

                } else {
                    _this.exec(endpoint)
                    .then((result) => {
                        (result?.status)? window.location.reload() : permission.setState(result);
                    })
                    .catch((err) => {
                        throw err;
                    })
                }
            })
        })
    }

    exec(endpoint) {
        return new Promise((resolve, reject) => {
            https.DELETE(token, this.payload, endpoint)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                throw err;
            })
        })
    }
}