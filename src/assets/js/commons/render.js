
import { httpsService } from "./httpService.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

/**
 * 
 * Method render table header.
 * @param {*} wrapperTemplate wrapperTemplate Element HTML box parent arount theader.
 * @param {*} titles this's list title want render
 */
export function renderHeaderTable(wrapperTemplate, titles) {
    let template = titles.reduce((accument, currentValue) => {
        return accument.concat(`<th>${currentValue}</th>`);
    }, []).join("");

    wrapperTemplate.innerHTML = template;
}


/**
 *
 * Method render table template.
 * @param {*} wrapperTemplate Element HTML box parent arount tbody.
 * @param {*} data object covert to template.
 * @param {*} hideProperty property object not show in template.
 * @param {*} endpoint set up type page VD: ../users, ../course, .../vvv
 */
export function renderBodyTable(wrapperTemplate, data, hideProperty, endPoint) {
    let template = data.reduce((accument, current, curentIndex) => {
        return accument.concat(renderKeys(current, curentIndex, hideProperty, endPoint, renderTemplate));
    }, []).join("");

    wrapperTemplate.innerHTML = template;
}

function renderKeys(currentData, currentIndex, hideProperty, endPoint, callback) {
    let keys = Object.keys(currentData).reduce((accument, currunetValue) => {
        if (hideProperty.every((e) => e != currunetValue)) {
            return accument.concat(currunetValue);
        }
        return accument;
    }, []);

    return callback(currentData, currentIndex, keys, endPoint);
}

function renderTemplate(currentData, currentIndex, keys, endPoint) {
    let template = `<tr> <td>${currentIndex}</td>`;

    let content = keys.reduce((accument, currunetValue) => {
        return accument.concat(`<td>${currentData[currunetValue]}</td>`);
    }, []).join("");

    return template += content + renderButtonAction(currentData["_id"], endPoint) + "</tr>";
}

function renderButtonAction(currentId, endPoint) {
    let template = `
    <td>
        <a class="btn-edit" href="/${endPoint}/detail?type=update&id=${currentId}">Cập nhật</a>
        <a href="#" class="btn-delete btn-delete-user"
            data-toggle="modal"
            data-whatever="${currentId}"
            data-id="${currentId}"
            data-target="#deleteUser">
            Xóa
        </a>
    </td>`;

    return template;
}

/**
 * 
 * Method render pagination template.
 * @param {*} wrapperTemplate wrapper box content pagination.
 * @param {*} pageRequire number page customer want show.
 * @param {*} totalDocument number all document.
 * @param {*} endPoint connect to api.
 */
export function renderPagination(wrapperTemplate, pageRequire, totalDocument, endPoint, callBack) {
    let template = '';
    let totalPages = Math.ceil(totalDocument / pageRequire);
    for (let i = 0; i < totalPages; i++) {
        template += `<li class="page-items" data-id="${(i + 1)}"><a class="page-link">${(i + 1)}</a></li>`;
    }
    wrapperTemplate.innerHTML = template;
    renderPaginationAction(pageRequire, endPoint, callBack);
}

function renderPaginationAction(pageRequire, endPoint, callBack) {
    $$(".page-items").forEach(function (item) {
        item.addEventListener("click", function (e) {
            let start = pageRequire * (this.dataset.id - 1);
            httpsService(`${endPoint}?limit=${pageRequire}&start=${start}`, "GET", null)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    callBack(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })
}