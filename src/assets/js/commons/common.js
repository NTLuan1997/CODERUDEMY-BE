export function awaitLoader(element, status) {
    if (element && status) {
        element.classList.add("active");

    } else {
        element.classList.remove("active");
    }
}

export function getType() {
    let type = location.search.split("&")[0];
    if (type && type.includes("type")) {
        return type.split("=")[1];
    }
    return null;
}

export function getToken() {
    let token = location.search.split("&")[1];
    if (token && token.includes("id")) {
        return token.split("=")[1];
    }
    return null;
}