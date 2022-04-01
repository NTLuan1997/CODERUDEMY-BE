import { httpsService } from "./httpService.js";
const $ = document.querySelector.bind(document);
let userId = null;

export function deleteDocument(element, endPoint) {
    for (let E of element) {
        E.addEventListener("click", function (e) {
            userId = this.dataset.id;
        })
    }

    $("#delete-document").addEventListener("click", function (e) {
        removeDocument(userId, endPoint);
    })

}

function removeDocument(id, endPoint) {
    httpsService(endPoint, "DELETE", { "id": id })
        .then((res) => {
            // console.log(data);
            // if (data.status) {
            //     location.reload();
            // }
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}