import { getType, getToken } from "../commons/common.js";
import { httpsService } from "../commons/httpService.js";
import { Validation } from "../commons/validation.js";

window.onload = function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let unitForm = $("#unit-detail");
    let courseCode = $("#course-code");
    let unitName = $("#unit-name");
    let unitLesson = $("#unit-lesson");
    let unitStatus = $("input[name='status']:checked");
    let unitCreateDate = $("#unit-create-date");
    let unitEditLastDate = $("#unit-edit-last-date");

    $$(".go-back").forEach((e) => {
        e.addEventListener("click", function (element) {
            window.history.back();
        })
    });

    Validation({
        form: "#unit-detail",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#course-code",
                guides: [Validation.required()]
            },
            {
                selector: "#unit-name",
                guides: [Validation.required()]
            },
            {
                selector: "#unit-create-date",
                guides: [Validation.required()]
            },
            {
                selector: "#unit-edit-last-date",
                guides: [Validation.required()]
            }
        ]
    });

    if (getType() == "update") {
        (function () {
            console.log(getToken());
            httpsService("API/unit/unit-single", "POST", { id: getToken() })
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    setCourseForm(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }());
    }

    switch (getType()) {
        case "update":
            setTitleForm("update");
            unitForm.addEventListener("submit", updateUser);
            break;

        case "create":
        default:
            courseCode.value = getToken();
            setTitleForm("create");
            unitForm.addEventListener("submit", createUser);
            break;
    }

    function createUser(e) {
        e.preventDefault();
        if (this.valid) {
            let unit = getCourseForm();
            if (unit) {
                httpsService("API/unit/unit-new", "POST", unit)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.status) {
                            location.href = `/courses/units?course=${unit.courseId}`;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    function updateUser(e) {
        e.preventDefault();
        if (this.valid) {
            let unit = getCourseForm();
            unit["id"] = getToken();
            if (unit) {
                httpsService("API/unit/unit-edit", "PUT", unit)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.status) {
                            location.href = `/courses/units?course=${unit.courseId}`;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    function getCourseForm() {
        let data = {
            courseId: courseCode.value,
            unitName: unitName.value,
            status: ($("input[name='status']:checked").value == "action") ? true : false,
            amountLesson: (getType() == "update") ? unitLesson.value : 0,
            createDate: unitCreateDate.value,
            updateDate: unitEditLastDate.value
        }
        return data;
    }

    function setCourseForm(unit) {
        courseCode.value = unit.courseId;
        unitName.value = unit.unitName;
        unitLesson.value = unit.amountLesson;
        (unit.status) ? $(`input[id='active']`).checked = true : $(`input[id='no-active']`).checked = true;
        unitCreateDate.value = unit.createDate.split(".")[0];
        unitEditLastDate.value = unit.updateDate.split(".")[0];
    }

    function setTitleForm(type) {
        let title = $$(".page-detail--title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới Chương học";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật";
        }
    }

    $("#come-back").addEventListener("click", function (e) {
        window.history.back();
    })
}