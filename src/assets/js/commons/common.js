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