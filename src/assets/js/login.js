window.onload = function (e) {
    let $ = document.querySelector.bind(document);

    let url = location.href;
    let loginForm = $("#user_login");

    loginForm.addEventListener("click", function (e) {
        e.preventDefault();
        let email = $("#user_email").value;
        let password = $("#user_password").value;
        let body = { email, password };

        console.log(body);

        if (email && password) {
            fetch(url + 'API/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then((res) => {
                    return res.json();
                })
                .then((user) => {
                    if (user.status) {
                        console.log(user);
                        saveUser(user);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    function saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user.data));
        location.href = "/home";
    }
}