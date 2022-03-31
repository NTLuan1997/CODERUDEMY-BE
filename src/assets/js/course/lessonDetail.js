import { getType, getToken } from "../commons/common.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let lessonForm = $("#lesson-detail--info");
    let unitCode = $("#unit-code");
    let name = $("#lesson-name");
    let content = $("#lesson-content");
    let status = $("input[name='status']:checked");
    let thumbnail = $("#lesson-thumbanil");
    let createDate = $("#lesson-create-date");
    let editLastDate = $("#lesson-edit-last-date");

    $("#go-back").addEventListener("click", function (element) {
        window.history.back();
    })

    if (getType() == "update") {
        (function () {
            console.log(getToken());
            httpsService("API/lesson/lesson-single", "POST", { id: getToken() })
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
            lessonForm.addEventListener("submit", updateLesson);
            break;

        case "create":
        default:
            unitCode.value = getToken();
            setTitleForm("create");
            lessonForm.addEventListener("submit", createLesson);
            break;
    }

    function createLesson(e) {
        e.preventDefault();
        let lesson = getLesson();
        if (lesson) {
            httpsService("API/lesson/lesson-new", "POST", lesson)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        location.href = `/courses/units/lessons?unitId=${lesson.unitId}`;
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function updateLesson(e) {
        e.preventDefault();
        let lesson = getLesson();
        lesson["id"] = getToken();
        if (lesson) {
            httpsService("API/lesson/lesson-edit", "PUT", lesson)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        location.href = `/courses/units/lessons?unitId=${lesson.unitId}`;
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function getLesson() {
        let data = {
            unitId: unitCode.value,
            lessonName: name.value,
            lessonContent: content.value,
            status: ($("input[name='status']:checked").value == "action") ? true : false,
            thumbnail: thumbnail.value,
            createDate: createDate.value,
            updateDate: editLastDate.value
        }
        return data;
    }

    function setCourseForm(lesson) {
        unitCode.value = lesson.unitId;
        name.value = lesson.lessonName;
        content.value = lesson.lessonContent;
        (lesson.status) ? $(`input[id='active']`).checked = true : $(`input[id='no-active']`).checked = true;
        thumbnail.value = lesson.thumbnail;
        createDate.value = lesson.createDate.split(".")[0];
        editLastDate.value = lesson.updateDate.split(".")[0];
    }

    function setTitleForm(type) {
        let title = $$(".page-detail--title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới bài học";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật";
        }
    }
}