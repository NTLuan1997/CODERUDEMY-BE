import { HTTPS } from "./https.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const https = new HTTPS();

export default class Delete {

    constructor() { }

    method(parameter, endPoint) {
        let deletesBTN = $$(`.${parameter}`);
        for(let i = 0; i < deletesBTN.length; i++) {
            deletesBTN[i].addEventListener("click", function(e) {
                console.log(this.dataset.id);
            })
        }
    }
}