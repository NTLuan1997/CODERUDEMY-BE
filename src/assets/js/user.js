window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const url = location.href;

    let status = $("input[name='status']:checked");
    let userForm = $("#users-detail--info");
    let userName = $("#user-name");
    let password = $("#password");
    let skills = $("#skills");
    let email = $("#email");
    let age = $("#age");

    switch (getParams(0)[1]) {
        case "u":
            userForm.addEventListener("submit", updateUser);
            break;

        case "d":
            userForm.addEventListener("submit", deleteUser);
            break;

        case "p":
        default:
            userForm.addEventListener("submit", createUser);
            break;
    }

    function createUser(e) {
        e.preventDefault();
        let data = getUserForm();
        if (data) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    console.log(res);
                })
        }
    }

    function updateUser(e) {
        e.preventDefault();
        let data = getUserForm();
        if (data) {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    console.log(res);
                })
        }
    }

    function deleteUser(e) {
        e.preventDefault();
        let data = getUserForm();
        if (data) {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    console.log(res);
                })
        }
    }

    function getUserForm() {
        let data = {
            "id": getParams(1)[1],
            "user_name": userName.value,
            "email": email.value,
            "password": password.value,
            "age": age.value,
            "status": status.value,
            "skills": skills.value || []
        }
        if ((!data["user_name"] || !data.email) ||
            (!data.password || !data.age) || !data.status) {
            return null;
        }
        return data;
    }

    function getParams(indexParame) {
        let parameters = url.split("?");
        let parameter = parameters[1].split("&&");
        return parameter[indexParame].split("=");
    }

}