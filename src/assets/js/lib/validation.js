import {environment} from "../config/environment.js";
/**
 * 
 * @param {*} options 
 * + Include:
 *      1) Form wrapper: parent form around input.
 *      2) SelectorError: parent message around content message.
 *      2) Rules: multiple rule validation.
 */
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexPassword = /([A-Za-z]){1,}([#?!@$%^&*]){1,}([A-Za-z]{1,})|([\d]{1,})$/g;
let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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

                    linkedElement(Form, Input, Message, messageContent, rule);
                    optionalElement(Form, Input, Message, messageContent, rule);
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

                linkedElement(Form, Input, Message, messageContent, rule);
                optionalElement(Form, Input, Message, messageContent, rule);
            })
        })
    }
}

function linkedElement(form, input, message, messageContent, rule) {
    if(rule.hasOwnProperty("linked")) {
        if(rule.linked.element.value === input.value) {
            handleMessage(form, input, message, null);

        } else if(!rule.linked.element.value) {
            input.value = "";
            handleMessage(form, input, message, null);

        } else if(!input.value) {
            handleMessage(form, input, message, null);

        } else {
            handleMessage(form, input, message, messageContent);
        }
    }
}

function handleMessage(form, input, message, messageContent) {
    if (messageContent) {
        message.innerText = messageContent;
        message.classList.add("invalid-feedback");
        input.classList.add("is-invalid");
        Object.defineProperty(input, "valid", { value: false, writable: true });
        Object.defineProperty(form, "valid", { value: false, writable: true });

    } else {
        message.innerText = '';
        message.classList.remove("invalid-feedback");
        input.classList.remove("is-invalid");
        Object.defineProperty(input, "valid", { value: true, writable: true });
        Object.defineProperty(form, "valid", { value: true, writable: true });
    }
}

function optionalElement(form, input, message, messageContent, rule) {
    if(rule.hasOwnProperty("optional") && rule?.optional) {
        if(messageContent) {
            input.value = "";
            messageContent = null;
            handleMessage(form, input, message, null);
        }
    } else {
        handleMessage(form, input, message, messageContent);
    }
}

Validation.required = function () {
    return {
        test: function (value) {
            return value.trim() ? null : "N???i dung kh??ng ???????c tr???ng";
        }
    }
}

Validation.isEmail = function () {
    return {
        test: function (value) {
            return regexEmail.test(value) ? null : "Email kh??ng h???p l???";
        }
    }
}

Validation.minLength = function (min) {
    return {
        test: function (value) {
            return value.trim().length >= min ? null : `M???t kh???u d??i h??n ${min} k?? t???`;
        }
    }
}

Validation.maxLength = function (max) {
    return {
        test: function (value) {
            return value.trim().length >= max ? `M???t kh???u ng???n h??n ${max} k?? t???` : null;
        }
    }
}

Validation.phone = function() {
    return {
        test: function(value) {
            return (!regexPhone.test(value.trim()))? "S??? ??i???n tho???i kh??ng h???p l???": null;
        }
    }
}

Validation.password = function() {
    return {
        test: function(value) {
            return (!regexPassword.test(value.trim()))? "Password kh??ng h???p l???" : null;
        }
    }
}

Validation.ConfirmPassword = function(password) {
    return {
        test: function(value) {
            let message = null;
            if(!password?.value) {
                Password.focus();
                message = null;
            } else {
                if(Password.value !== value) {
                    message = "Password nh???p l???i kh??ng h???p l???";
                } else {
                    message = null;
                }
            }
            return message;
        }
    }
}

Validation.dateOfBirth = function (minAge, maxAge) {
    return {
        test: function (value) {
            let message = "";
            let age = moment().diff(value, 'years');

            if (age <= minAge) {
                message = `Tu???i ng?????i d??ng ph???i l???n h??n ${minAge}`;

            } else if (age > maxAge) {
                message = `Tu???i ng?????i d??ng ph???i nh??? h??n ${minAge}`;

            } else {
                message = null;
            }

            return message;
        }
    }
}

Validation.data = function (data) {
    let message = '';
    if (!data?.status) {
        if (data.type == "password-Incorrect") {
            message = environment.error.passwordIncorrect;
        }
    }
    return {
        test: function () {
            return message;
        }
    }
}