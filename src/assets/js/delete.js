import { httpsService } from "./httpService.js";
const $ = document.querySelector.bind(document);
const origin = window.location.origin;
let userId = null;

export function deleteUser(element) {
    for (let E of element) {
        E.addEventListener("click", function (e) {
            userId = this.dataset.id;
        })
    }

    $("#delete-user").addEventListener("click", function (e) {
        removeUser(userId);
    })

}

function removeUser(id) {
    httpsService("API/user/remove", "DELETE", { "id": id })
        .then((data) => {
            if (data.status) {
                location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        })
}