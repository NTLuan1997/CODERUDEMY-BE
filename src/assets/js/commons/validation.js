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

/**
 * 
 * @param {*} options 
 * + Include:
 *      1) Form wrapper: parent form around input.
 *      2) SelectorError: parent message around content message.
 *      2) Rules: multiple rule validation.
 */
export function Validation(options) {
    let Form = document.querySelector(options?.form);

    if (Form) {
        options.rules.forEach(function (rule) {
            let Input = Form.querySelector(rule.selector);
            let FormGroup = Input.parentElement;
            let Message = FormGroup.querySelector(options?.selectorError);
            let messageContent = null;

            if (Input) {
                Input.addEventListener("blur", function (e) {
                    for (let i = 0; i < rule.guides.length; i++) {
                        messageContent = rule.guides[i].test(this.value);
                        if (this.tagName == "SELECT" && this.value == "default") {
                            messageContent = rule.guides[i].test("");
                        }
                        if (messageContent) break;
                    }

                    handleMessage(Form, Input, Message, messageContent);
                })

                Input.addEventListener("input", function (e) {
                    if (this.classList.contains("is-invalid")) {
                        handleMessage(Form, Input, Message, null);
                    }
                })
            }

            Form.addEventListener("submit", function () {
                for (let i = 0; i < rule.guides.length; i++) {
                    messageContent = rule.guides[i].test(Input.value);
                    if (Input.tagName == "SELECT" && Input.value == "default") {
                        messageContent = rule.guides[i].test("");
                    }
                    if (messageContent) break;
                }
                handleMessage(Form, Input, Message, messageContent);
                if (!!messageContent) Object.defineProperty(Form, "valid", { value: false, writable: true });
            })
        })
    }

}

function handleMessage(form, input, message, messageContent) {
    if (messageContent) {
        message.innerText = messageContent;
        message.classList.add("invalid-feedback");
        input.classList.add("is-invalid");
        Object.defineProperty(form, "valid", { value: false, writable: true });

    } else {
        message.innerText = '';
        message.classList.remove("invalid-feedback");
        input.classList.remove("is-invalid");
        Object.defineProperty(form, "valid", { value: true, writable: true });
    }
}

Validation.required = function () {
    return {
        test: function (value) {
            return value.trim() ? null : "Nội dung không được trống";
        }
    }
}

Validation.isEmail = function () {
    return {
        test: function (value) {
            return regexEmail.test(value) ? null : "Email không hợp lệ";
        }
    }
}

Validation.minLength = function (min) {
    return {
        test: function (value) {
            return value.trim().length >= min ? null : `Mật khẩu dài hơn ${min} ký tự`;
        }
    }
}

Validation.maxLength = function (max) {
    return {
        test: function (value) {
            return value.trim().length >= max ? `Mật khẩu ngắn hơn ${max} ký tự` : null;
        }
    }
}

Validation.dateOfBirth = function (minAge, maxAge) {
    return {
        test: function (value) {
            let message = "";
            let age = moment().diff(value, 'years');

            if (age <= minAge) {
                message = `Tuổi người dùng phải lớn hơn ${minAge}`;

            } else if (age > maxAge) {
                message = `Tuổi người dùng phải nhỏ hơn ${minAge}`;

            } else {
                message = null;
            }

            return message;
        }
    }
}