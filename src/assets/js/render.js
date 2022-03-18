/**
 * 
 * @param {*} wrapperTemplate Element HTML box parent arount tbody.
 * @param {*} data object covert to template.
 * @param {*} hideProperty property object not show in template.
 * @param {*} endpoint set up type page VD: ../users, ../course, .../vvv
 */
export function renderCommonBody(wrapperTemplate, data, hideProperty, endpoint) {
    let template = data.reduce((accument, current, curentIndex) => {
        return accument.concat(renderKeys(current, curentIndex, hideProperty, endpoint, renderTemplate));
    }, []).join("");

    wrapperTemplate.innerHTML = template;
}

function renderKeys(currentData, currentIndex, hideProperty, endpoint, callback) {
    let keys = Object.keys(currentData).reduce((accument, currunetValue) => {
        if (hideProperty.every((e) => e != currunetValue)) {
            return accument.concat(currunetValue);
        }
        return accument;
    }, []);

    return callback(currentData, currentIndex, keys, endpoint);
}

function renderTemplate(currentData, currentIndex, keys, endpoint) {
    let template = `<tr> <td>${currentIndex}</td>`;

    let content = keys.reduce((accument, currunetValue) => {
        return accument.concat(`<td>${currentData[currunetValue]}</td>`);
    }, []).join("");

    return template += content + renderButtonAction(currentData["_id"], endpoint) + "</tr>";
}

function renderButtonAction(currentId, endpoint) {
    let template = `
    <td>
        <button type="button" class="btn btn-primary">
            <a href="/${endpoint}/detail?type=update&id=${currentId}">Sửa</a>
        </button>
        <button type="button" class="btn btn-danger btn-delete-user" data-toggle="modal"
            data-whatever="${currentId}" data-id="${currentId}" data-target="#deleteUser">Xóa</button>
    </td>`;

    return template;
}