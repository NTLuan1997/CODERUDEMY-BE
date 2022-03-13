let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let message = null;
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validation(type, element, callback) {
    switch (type) {
        case 'email':
            emailValidation(element, callback);
            break;

        case 'password':
            passwordValidation(element, callback);
            break;

        default:
            break;
    }
}

export function resValidation(error, callback, ...element) {
    element.forEach((E) => {
        message = $(`#${E?.dataset.id}`);
        message.style.display = "block";
        message.textContent = "Thông tin người dùng không đúng";
    })
    callback(false);
}

function emailValidation(element, callback) {
    callback(false);
    message = $(`#${element?.dataset.id}`);

    if (!regexEmail.test(element.value)) {
        setMessage(message, "Email không hợp lệ vui lòng nhập lại");

    }
    else {
        message.style.display = "none";
        callback(true);
    }
}

function passwordValidation(element, callback) {
    callback(false);
    message = $(`#${element?.dataset.id}`);

    if (element.value.length < 5) {
        setMessage(message, "Password không đủ vui lòng nhập lại");

    }
    else {
        message.style.display = "none";
        callback(true);
    }
}

function setMessage(element, message) {
    element.style.display = "block";
    element.textContent = message;
}