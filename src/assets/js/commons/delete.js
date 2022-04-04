import { httpsService } from "./httpService.js";
import { permission } from "./common.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let Id = null;
let modalBody = $$(".modal-body")[0];
let toasts = $$(".modal-toasts")[0];

export function deleteDocument(element, endPoint) {
    modalBody.textContent = "Bạn có chắc muốn thực hiện!!!";
    for (let E of element) {
        E.addEventListener("click", function (e) {
            Id = this.dataset.id;
        })
    }

    $("#delete-document").addEventListener("click", function (e) {
        removeDocument(Id, endPoint);
    })
}

function removeDocument(Id, endPoint) {
    httpsService(endPoint, "DELETE", { "id": Id })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data.status) {
                permission(toasts, data);
            } else {
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        })
}