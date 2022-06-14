import { Cookie } from "./cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "./https.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cookie = new Cookie();
const https = new HTTPS();

let token = `Bearer ${cookie.get("Authentic")}`;
export default class Delete {

    constructor() { }

    // method(parameter, endPoint) {
    //     let deletesBTN = $$(`.${parameter}`);
    //     for(let i = 0; i < deletesBTN.length; i++) {
    //         deletesBTN[i].addEventListener("click", function(e) {
    //             let payload = {
    //                 Type: "Delete",
    //                 "Id": this.dataset.id
    //             };

    //             https.DELETE(token, payload, endPoint)
    //             .then((result) => {
    //                 if(result?.status) {
    //                     window.location.reload();
    //                 }
    //             })
    //             .catch((err) => {
    //                 throw err;
    //             })
    //         })
    //     }
    // }
}