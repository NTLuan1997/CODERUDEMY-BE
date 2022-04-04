export function awaitLoader(element, status) {
    if (element && status) {
        element.classList.add("active");

    } else {
        element.classList.remove("active");
    }
}

/**
 * 
 * Method handle error "You haven't permission".
 * @param {*} modal toasts show message
 * @param {*} data message form server respone
 */
export function permission(modal, data) {
    let content = modal.querySelector(".content");
    console.log(content);
    modal.classList.add("active");
    content.innerText = handlePermission(data?.message);

    setTimeout(function () {
        modal.classList.remove("active");
    }, 7000);
}

function handlePermission(message) {
    let messageError = null;
    if (message == "Permissions") {
        messageError = "Đăng nhập với quyền admin";
    }
    return messageError;
}

export function getType() {
    let type = location.search.split("&")[0];
    if (type && type.includes("type")) {
        return type.split("=")[1];
    }
    return null;
}

export function getToken() {
    let keys = ["id", "course", "unitId"];
    let token = location.search.split("&")[1];
    if (token && keys.some((e) => token.includes(e))) {
        return token.split("=")[1];
    }
    return 0;
}

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}