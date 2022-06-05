export class Priture {
    form = new FormData();

    constrcutor() {}

    clientThumbnail(url, file, oldPriture) {
        if(oldPriture) {
            this.form.append("Priture", oldPriture);
        }
        
        this.form.append("client", file);
        this.form.append("Type", "Client");
        let _this = this;

        return new Promise(function(resolve, reject) {
            fetch(url, {
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

    upload(url, file, destination, priture) {
        if(priture){ this.form.append("priture", priture) }
        this.form.append("file", file);
        this.form.append("type", "priture");
        this.form.append("destination", destination);
        let _this = this;

        return new Promise(function(resolve, reject) {
            fetch(url, {
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
