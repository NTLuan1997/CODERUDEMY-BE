import { environment } from "../config/environment.js";

export function upload(form) {
    return new Promise((resolve, reject) => {
        fetch(environment.upload.server, {
            "method": "post",
            "body": form
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            throw err;
        });
    });
}
