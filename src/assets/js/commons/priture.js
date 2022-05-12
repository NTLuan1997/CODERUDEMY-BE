import { environment } from "../config/environment.js";
export class Priture {
    form = new FormData();

    constrcutor() {}

    clientThumbnail(file, oldPriture) {
        if(oldPriture) {
            this.form.append("Priture", oldPriture);
        }
        
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
