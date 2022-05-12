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

export class Priture {
    form = new FormData();

    constrcutor() {}

    clientThumbnail(file) {
        this.form.append("client", file);
        this.form.append("Type", "Client");
        let _this = this;

        return new Promise(function(resolve, reject) {
            fetch(environment.priture.client.url, {
                "method": "post",
                "body": _this.form
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                throw err;
            })
        })
    }

}
