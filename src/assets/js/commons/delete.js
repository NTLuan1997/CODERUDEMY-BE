import { httpsService } from "./httpService.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let userId = null;
let modalBody = $$(".modal-body")[0];

export function deleteDocument(element, endPoint) {
    modalBody.textContent = "Bạn có chắc muốn xóa người dùng này!!!";
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
            return res.json();
        })
        .then((data) => {
            modalBody.textContent = data.message;
        })
        .catch((err) => {
            console.log(err);
        })
}