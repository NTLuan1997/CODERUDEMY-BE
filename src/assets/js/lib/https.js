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
                    "Authorization": token
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

    DELETE(token, body, endPoint) {
        return new Promise((resolve, reject) => {
            fetch(endPoint, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": token
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
}