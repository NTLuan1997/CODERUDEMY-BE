
import { httpsService } from "./httpService.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
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
        <button type="button" class="btn btn-primary">
            <a href="/${endPoint}/detail?type=update&id=${currentId}">Sửa</a>
        </button>
        <button type="button" class="btn btn-danger btn-delete-user" data-toggle="modal"
            data-whatever="${currentId}" data-id="${currentId}" data-target="#deleteUser">Xóa</button>
    </td>`;

    return template;
}

/**
 * 
 * Method render pagination template.
 * @param {*} wrapperTemplate 
 * @param {*} pageRequire 
 * @param {*} totalDocument 
 * @param {*} endPoint 
 */
export function renderPagination(wrapperTemplate, pageRequire, totalDocument, endPoint, callBack) {
    let template = '';
    let totalPages = Math.ceil(totalDocument / pageRequire);
    for (let i = 0; i < totalPages; i++) {
        template += `<li class="page-items" data-id="${(i + 1)}"><a class="page-link">${(i + 1)}</a></li>`;
    }
    wrapperTemplate.innerHTML = template;
    renderPaginationAction(pageRequire, endPoint, callBack)
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