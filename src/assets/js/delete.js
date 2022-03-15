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
        // console.log(userId);
        removeUser(userId);
    })

}

function removeUser(id) {
    fetch(origin + "/API/user/remove", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then((data) => {
            if (data.status) {
                location.href = "/users";
            }
        })
        .catch((err) => {
            console.log(err);
        })
}