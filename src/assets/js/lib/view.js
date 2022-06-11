import Origin from "./lib-origin.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export class View {
    BlankView = $("#Blank-data");
    URLMethod = "";
    Origin = "";
    Pages = ["course", "unit"];


    constructor() {
        this.Origin = new Origin();
    }

    setUrl(url) { this.URLMethod = url }

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
        let template = [];
        let resultKey = Object.keys(Result);
        for(let i = 0; i < KeyView.length; i++) {
            for(let j = 0; j < resultKey.length; j++) {
                if(KeyView[i] === resultKey[j]) {
                    template.push(`<td>${Result[resultKey[j]]}</td>`);
                }
            }
        }
        template.push(this.templateMethod(Result?._id));
        return template.join(" ");
    }

    templateMethod(token) {
        let type = (this.Origin.checkTypePage() === "course") ? this.Origin.checkTypePage() : `course/${this.Origin.checkTypePage()}`;
        let title = (this.Origin.checkTypePage() === "course") ? "Học phần" : "Khóa học";
        let nextPage = (this.Origin.checkTypePage() === "course")? "course/unit" : "course/unit/lesson";
        let ID = (this.Origin.checkTypePage() === "course")? "unit" : "lesson";

        if(this.Pages.includes(this.Origin.checkTypePage())) {
            return `
                <td class="d-flex">
                    <a href="/web/${nextPage}" class="btn-method mr-2 ${ID}" data-id="${token}">${title}</a>
                    <a href="/web/${type}/detail?type=update&token=${token}" class="btn-method mr-2">Sửa</a>
                    <button class="btn-method delete" data-id="${token}" type="button">Xóa</button>
                </td>
            `;
        }
        return `
            <td class="d-flex">
                <a href="/web/${type}/detail?type=update&token=${token}" class="btn-method mr-2">Sửa</a>
                <button class="btn-method delete" data-id="${token}" type="button">Xóa</button>
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