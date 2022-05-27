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

export class HTTPS {

    constructor() { }

    FIND(payload, token, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(endPoint, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    "Comment": JSON.stringify(payload)
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
            })
        })
    }

    GET(token, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(endPoint, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
            })
        })
    }

    POST(token, body, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(`${origin}${endPoint}`, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                "body":  JSON.stringify(body)
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
            })
        })
    }

    PUT(token, body, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(endPoint, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json",
                    "Authentication": token
                },
                "body": JSON.stringify(body)
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
            })
        })
    }

    DELETE(token, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(endPoint, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json",
                    "Authentication": token
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
            })
        })
    }
}