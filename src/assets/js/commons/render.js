
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
export function renderBodyTable(wrapperTemplate, data, hideProperty, endPoint, pointter, codeName) {
    let undefineData = document.querySelectorAll(".undefine-data")[0];
    if (!Object.values(data).length) {
        undefineData.classList.add("active");
    } else {
        if (undefineData.classList.contains("active")) {
            undefineData.classList.remove("active");
        }

        let template = data.reduce((accument, current, curentIndex) => {
            return accument.concat(renderKeys(current, curentIndex, hideProperty, endPoint, pointter, codeName, renderTemplate));
        }, []).join("");

        wrapperTemplate.innerHTML = template;
    }
}

function renderKeys(currentData, currentIndex, hideProperty, endPoint, pointter, codeName, callback) {
    let keys = Object.keys(currentData).reduce((accument, currunetValue) => {
        if (hideProperty.every((e) => e != currunetValue)) {
            return accument.concat(currunetValue);
        }
        return accument;
    }, []);

    return callback(currentData, currentIndex, keys, endPoint, pointter, codeName);
}

function renderTemplate(currentData, currentIndex, keys, endPoint, pointter, codeName) {
    let template = `<tr> <td>${currentIndex}</td>`;

    let content = keys.reduce((accument, currunetValue) => {

        if (currunetValue == "createDate" || currunetValue == "updateDate") {
            currentData[currunetValue] = new Date(currentData[currunetValue].split(".")[0]).toLocaleString();
        }

        return accument.concat(`<td>${currentData[currunetValue]}</td>`);
    }, []).join("");

    return template += content + renderButtonAction(currentData["_id"], endPoint, pointter, codeName) + "</tr>";
}

function renderButtonAction(currentId, endPoint, pointter, codeName) {
    let mappPointer = ["courses", "courses/units"];
    let title = (pointter == "units") ? "Chương Học" : "Bài học";
    let template = "<td>";
    if (mappPointer.includes(endPoint)) {
        template += `
                <a class="btn-edit" href="/${endPoint}/detail?type=update&id=${currentId}">Cập nhật</a>
                <a class="btn-edit router-child"
                    data-id="${currentId}"
                    href="/${endPoint}/${pointter}?${codeName}=${currentId}">
                    ${title}
                </a>
                <a href="#" class="btn-delete btn-delete-document"
                    data-toggle="modal"
                    data-whatever="${currentId}"
                    data-id="${currentId}"
                    data-target="#deleteUser">
                    Xóa
                </a>
            </td>
        `;

    } else {
        template += `
                <a class="btn-edit" href="/${endPoint}/detail?type=update&id=${currentId}">Cập nhật</a>
                <a href="#" class="btn-delete btn-delete-document"
                    data-toggle="modal"
                    data-whatever="${currentId}"
                    data-id="${currentId}"
                    data-target="#deleteUser">
                    Xóa
                </a>
            </td>
        `;
    }

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
export function renderPagination(wrapperTemplate, pageRequire, totalDocument, endPoint, callBack, condition) {
    let template = '';
    let totalPages = Math.ceil(totalDocument / pageRequire);
    for (let i = 0; i < totalPages; i++) {
        template += `<li class="page-items" data-id="${(i + 1)}"><a class="page-link">${(i + 1)}</a></li>`;
    }
    wrapperTemplate.innerHTML = template;
    renderPaginationAction(pageRequire, endPoint, callBack, condition);
}

function renderPaginationAction(pageRequire, endPoint, callBack, condition) {
    console.log(condition);
    let url = `${endPoint}?limit=${pageRequire}&start=Start`;
    if (condition) {
        condition.forEach((e) => {
            url += `&${e}`;
        })
    }

    $$(".page-items").forEach(function (item) {
        item.addEventListener("click", function (e) {
            let start = pageRequire * (this.dataset.id - 1);
            httpsService(url.replace("Start", start), "GET", null)
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