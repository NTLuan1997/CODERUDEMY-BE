window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let url = location.href;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let loader = $$(".modal-loader")[0];
    let email = $("#user_email");
    let password = $("#user_password");
    let loginForm = $("#user_login");

    (function () {
        loginForm.setAttribute("disabled", true);
        password.setAttribute("disabled", true);

        email.addEventListener("keyup", function (e) {
            let messageEmail = $(`#${this.dataset.id}`);
            if (!emailRegex.test(this.value)) {
                messageEmail.style.display = "block";
                messageEmail.textContent = "Email không đúng vui lòng nhập lại";

            } else {
                messageEmail.style.display = "none";
                password.removeAttribute("disabled");
            }
        })

        password.addEventListener("keyup", function (e) {
            let messagePassword = $(`#${this.dataset.id}`);
            if (this.value.length < 5) {
                messagePassword.style.display = "block";
                messagePassword.innerHTML = "Độ dài mật khẩu không đủ";

            } else {
                messagePassword.style.display = "none";
                loginForm.removeAttribute("disabled");
            }
        })


    }());

    loginForm.addEventListener("click", function (e) {
        e.preventDefault();
        loader.classList.add("active");

        if (email?.value && password?.value) {
            fetch(url + 'API/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email?.value, password: password?.value })
            })
                .then((res) => {
                    return res.json();
                })
                .then((user) => {
                    if (user.status) {
                        saveUser(user);

                    } else {
                        setMessage(user, [email, password]);
                    }
                    loader.classList.remove("active");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    function saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
        location.href = "/home";
    }

    function setMessage(data, ...element) {
        let { status, message, user } = data;
        let emailMessage = $("#email-feedback");
        let passwordMessage = $("#password-feedback");
        emailMessage.style.display = "block";
        passwordMessage.style.display = "block";

        emailMessage.textContent = message;
        passwordMessage.textContent = message;

    }
}