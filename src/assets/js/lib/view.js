import Origin from "./lib-origin.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export class View {
    Origin = "";


    constructor() {
        this.Origin = new Origin();
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
            template.unshift(`<th><input type="checkbox" id="parent-recycle"></th>`);
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

        if(type === "Recycle") {template.push(`<td><input type="checkbox" data-id="${currentValue._id}" class="childrens-recycle"/></td>`)}

        for(let i = 0; i < documentKeys.length; i++) {
            for(let j = 0; j < keys.length; j++) {
                if(documentKeys[i] === keys[j]) {
                    template.push(`<td>${currentValue[keys[j]]}</td>`);
                }
            }
        }
        template.push(this.methodView(type, currentValue, currentValue._id));
        return template.join(" ");
    }

    methodView(type, currentValue, token) {
        let Amount = (currentValue?.Unit)? currentValue?.Unit : 0;
        let template = "";
        let Thumbnail = (type === "Recycle" && currentValue?.Thumbnail)? currentValue?.Thumbnail : "";
        let page = this.Origin.page();

        switch (type) {
            case "LoadChildren":
                template = `
                    <td class="d-flex">
                        <a class="btn-method mr-2 redirect" data-id="${token}">Redirect</a>
                        <a class="btn-method mr-2" href="${page.pathname}/detail?type=update&token=${token}">Sửa</a>
                        <button class="btn-method delete" data-id="${token}" data-amount="${Amount}" type="button">Xóa</button>
                    </td>
                `;
                break;

            case "Recycle":
                template = `
                    <td class="d-flex">
                        <button class="btn btn-danger delete" data-id="${token}" data-thumbnail="${Thumbnail}" type="button">Xóa</button>
                    </td>
                `;
                break;

            case "Basic":
            default:
                template = `
                    <td class="d-flex">
                        <a class="btn-method mr-2" href="${page.pathname}/detail?type=update&token=${token}">Sửa</a>
                        <button class="btn-method delete" data-id="${token}" type="button">Xóa</button>
                    </td>
                `;
                break;
        }

        return template;
    }
}