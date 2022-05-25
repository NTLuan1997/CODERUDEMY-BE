export class Cookie {
    date = new Date();

    constructor() { }

    set(name, body) {
        let start = (this.date.toLocaleString().indexOf("/") + 1);
        let end = this.date.toLocaleString().lastIndexOf("/");
        let day = Number(this.date.toLocaleString().substring(start, end));

        let expires = new Date(this.date.toLocaleString().replace(`${day}`, (day + 1)));
        document.cookie = `${name}=${body}; expires=${expires}; path=/`;
    }

    get(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    remove(name) {
        document.cookie = `${name} = ''; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

}