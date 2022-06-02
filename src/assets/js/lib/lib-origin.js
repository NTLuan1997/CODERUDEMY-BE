export default class Origin {

    constructor() { }

    parameter() {
        let main = {};
        let {host, hostname, href, origin, pathname, port, protocol, search} = window.location;

        if(search.includes("token")) {
            main.token = search.slice(search.indexOf("token")).split("=")[1];
        }

        if(search.includes("type")) {
            if(search.includes("&")) {
                main.type = search.slice(0, search.indexOf("&")).split("=")[1];
            } else {
                main.type = search.slice(search.indexOf("type")).split("=")[1];
            }
        }
        return main;
    }

    checkTypePage() {
        let {host, hostname, href, origin, pathname, port, protocol, search} = window.location;
        let endPoint = href.substring((href.lastIndexOf("/") + 1));
        if(endPoint.includes("?")) {
            endPoint = endPoint.substring(0, endPoint.indexOf("?"));
        }
        return endPoint;
    }
}