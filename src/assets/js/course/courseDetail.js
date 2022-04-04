import { getType, getToken, permission } from "../commons/common.js";
import { Validation } from "../commons/validation.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let courseForm = $("#course-detail");
    let courseCode = $("#course-code");
    let courseName = $("#course-name");
    let courseType = $("#course-type");
    let courseUnit = $("#course-unit");
    let courseAuthor = $("#course-author");
    let courseCreateDate = $("#course-create-date");
    let courseEditLastDate = $("#course-edit-last-date");
    let courseThumbanil = $("#course-thumbnail");
    let courseDescription = $("#course-description");

    let toasts = $$(".modal-toasts")[0];


    Validation({
        form: "#course-detail",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#course-name",
                guides: [Validation.required()]
            },
            {
                selector: "#course-type",
                guides: [Validation.required()]
            },
            {
                selector: "#course-author",
                guides: [Validation.required()]
            },
            {
                selector: "#course-create-date",
                guides: [Validation.required()]
            },
            {
                selector: "#course-edit-last-date",
                guides: [Validation.required()]
            },
            {
                selector: "#course-thumbnail",
                guides: [Validation.required()]
            },
            {
                selector: "#course-description",
                guides: [Validation.required()]
            }
        ]
    });


    if (getType() == "update") {
        (function () {
            httpsService("API/course/course-single", "POST", { id: getToken() })
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
            courseForm.addEventListener("submit", updateUser);
            break;

        case "create":
        default:
            setTitleForm("create");
            courseForm.addEventListener("submit", saveCourse);
            break;
    }

    function saveCourse(e) {
        e.preventDefault();
        if (this.valid) {
            let data = getCourseForm();
            if (data) {
                httpsService("API/course/course-new", "POST", data)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        data.status ?
                            location.href = "/courses" :
                            permission(toasts, data);
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
            let data = getCourseForm();
            data["id"] = getToken();
            if (data) {
                httpsService("API/course/course-edit", "PUT", data)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        data.status ?
                            location.href = "/courses" :
                            permission(toasts, data);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    function getCourseForm() {
        let data = {
            courseName: courseName.value,
            author: courseAuthor.value,
            type: courseType.value,
            unit: (courseUnit.value) ? courseUnit.value : 0,
            createDate: courseCreateDate.value,
            updateDate: courseEditLastDate.value,
            description: courseDescription.value,
            thumbnail: courseThumbanil.value,
        }
        return data;
    }

    function setCourseForm(course) {
        courseCode.value = course["_id"];
        courseName.value = course.courseName;
        courseUnit.value = course.unit;
        courseAuthor.value = course.author;
        courseCreateDate.value = course.createDate.split(".")[0];
        courseEditLastDate.value = course.updateDate.split(".")[0];
        courseThumbanil.value = course.thumbnail;
        courseDescription.value = course.description;
        for (let type of courseType) {
            if (type.value == course.type) {
                type.setAttribute("selected", true);
            }
        }
    }

    function setTitleForm(type) {
        let title = $$(".page-detail--title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới khóa học";
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