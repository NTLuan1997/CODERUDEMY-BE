const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export class View {
    BlankView = $("#Blank-data");
    urlMethod = "";

    constructor() { }

    setUrl(url) { this.urlMethod = url }

    render(Result, ComponentHeader, KeyHeader, ComponentView, KeyComponent) {
        this.BlankView.classList.remove("active");
        if(!Result.length) {
            this.BlankView.classList.add("active");

        } else {
            this.headerView(ComponentHeader, KeyHeader);
            let template = Result.reduce((accument, current) => {
                return accument.concat(`<tr>${this.templateView(current, KeyComponent)}</tr>`);
            }, []).join(" ");
            ComponentView.innerHTML = template;
        }
    }

    templateView(Result, KeyView) {
        let template = Object.keys(Result).reduce((accument, current) => {
            if(KeyView.includes(current)) { return accument.concat(`<td>${Result[current]}</td>`) }
            return accument;
        }, []).join(" ");
        template += this.templateMethod(Result?._id);
        return template;
    }

    templateMethod(token) {
        return `
            <td class="d-flex">
                <a href="/web/client/detail?type=update&token=${token}" class="btn-method mr-2">Sửa</a>
                <button class="btn-method" type="button">Xóa</button>
            </td>
        `;
    }

    headerView(HeaderView, KeyView) {
        let template = KeyView.reduce((accument, current) => {
            return accument.concat(`<th>${current}</th>`);

        }, []).join(" ");
        HeaderView.innerHTML = template;
    }
}