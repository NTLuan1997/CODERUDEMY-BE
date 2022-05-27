export class Origin {

    constructor() { }

    parameter() {
        let main = {};
        let {host, hostname, href, origin, pathname, port, protocol, search} = window.location;

        if(search.includes("token")) {
            main.token = search.slice(search.indexOf("token")).split("=")[1];
        }

        if(search.includes("type")) {
            main.type = search.slice(search.indexOf("type"), search.indexOf("&")).split("=")[1];
        }
        return main;
    }
}