import Origin from "./lib-origin.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export class View {
    BlankView = $("#Blank-data");
    URLMethod = "";
    Origin = "";
    Pages = ["course", "unit"];
    Title = "";
    Type = "";


    constructor() {
        this.Origin = new Origin();
    }

    setUrl(url) { this.URLMethod = url }
    setType(title, type) {
        this.Title = title;
        this.Type = type
    }

    Render(options) {
        $(options.Blank).classList.remove("active");
        if(!options?.Result.length) {
            $(options.Blank).classList.add("active");

        } else {
            this.HeaderView($(options.Header), options.HeaderTitles, options.Type);
            this.BodyView($(options.Body), options.DocumentKeys, options.Result, options.Type);
        }
    }

    HeaderView(header, titles, type) {
        let template = titles.reduce((accument, currentValue) => {
            return accument.concat(`<th>${currentValue}</th>`);
        }, []);

        if(type === "Recycle") {
            template.unshift(`<th><input type="checkbox" class="parent-recycle"></th>`);
        }
        template.push("<th>Chúc năng</th>");

        header.innerHTML = template.join(" ");
    }

    BodyView(body, documentKeys, result, type) {
        let template = result.reduce((accument, currentValue) => {
            return accument.concat(`<tr>${this.contentView(documentKeys, currentValue, type)}</tr>`);
        }, []).join(" ");
        body.innerHTML = template;
    }

    contentView(documentKeys, currentValue, type) {
        let template = [];
        let keys = Object.keys(currentValue);

        if(type === "Recycle") { template.push(`<td><input type="checkbox" class="children-recycle"/></td>`); }
        for(let i = 0; i < documentKeys.length; i++) {
            for(let j = 0; j < keys.length; j++) {
                if(documentKeys[i] === keys[j]) {
                    template.push(`<td>${currentValue[keys[j]]}</td>`);
                }
            }
        }
        template.push(this.methodView(type, currentValue._id));
        return template.join(" ");
    }

    methodView(type, token) {
        let template = "";
        let page = this.Origin.page();

        switch (type) {
            case "Recycle":
                template = `
                    <td class="d-flex">
                        <button class="btn-method delete" type="button">Xóa</button>
                    </td>
                `;
                break;

            case "Basic":
            default:
                template = `
                    <td class="d-flex">
                        <a class="btn-method mr-2" href="${page}/detail?type=update&token=${token}">Sửa</a>
                        <button class="btn-method delete" data-id="${token}" type="button">Xóa</button>
                    </td>
                `;
                break;
        }

        return template;
    }




    // COMMON TEMPLATE
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
        let page = this.Origin.page();

        if(this.Pages.includes(this.Origin.checkTypePage())) {
            return `
                <td class="d-flex">
                    <a class="btn-method mr-2 ${this.Type}" style="cursor: pointer" data-id="${token}">${this.Title}</a>
                    <a class="btn-method mr-2" href="${page}/detail?type=update&token=${token}">Sửa</a>
                    <button class="btn-method delete" data-id="${token}" type="button">Xóa</button>
                </td>
            `;
        }
        return `
            <td class="d-flex">
                <a class="btn-method mr-2" href="${page}/detail?type=update&token=${token}">Sửa</a>
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