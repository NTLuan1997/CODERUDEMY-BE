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

    switch (message) {
        case "Accepted":
            messageError = "Phương thức không thể thực hiện";
            break;

        case "Missing data":
            messageError = "Không tìm thấy đối tượng tìm kiếm";
            break;

        case "Don't have body":
            messageError = "Không có dữ liệu gửi đến server";
            break;

        case "Permissions":
        default:
            messageError = "Đăng nhập với quyền admin";
            break;
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

export function mapperDate(date) {
    let convert = date.split("/");
    let year = convert[2];
    let month = (convert[0].length < 2) ? `0${convert[0]}` : convert[0];
    let day = (convert[1].length < 2) ? `0${convert[1]}` : convert[1];
    return `${year}-${month}-${day}`;
}