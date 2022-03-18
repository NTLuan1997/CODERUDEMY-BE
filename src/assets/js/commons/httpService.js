import { awaitLoader } from "./common.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let origin = location.origin;
let loader = $$(".modal-loader")[0];

export function httpsService(endpoint, method, body) {
    return new Promise((resolve, reject) => {
        awaitLoader(loader, true);
        fetch(origin + "/" + endpoint,
            (method != "GET") ?
                {
                    "method": method,
                    "headers": {
                        "content-type": 'application/json'
                    },
                    "body": JSON.stringify(body)
                } : { "method": method })
            .then((data) => {
                if (data) {
                    awaitLoader(loader, false);
                    resolve(data);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}