import { getType, getToken } from "../commons/common.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {


    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let userForm = $("#course-detail--info");
    let courseCode = $("#course-code");
    let courseName = $("#course-name");
    let courseType = $("#course-type");
    let courseLesson = $("#course-lesson");
    let courseAuthor = $("#course-author");
    let courseCreateDate = $("#course-create-date");
    let courseEditLastDate = $("#course-edit-last-date");
    let courseThumbanil = $("#course-thumbnail");
    let courseDescription = $("#course-description");

    if (getType() == "update") {
        (function () {
            console.log(getToken());
            httpsService("API/course/single", "POST", { id: getToken() })
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
            userForm.addEventListener("submit", updateUser);
            break;

        case "create":
        default:
            setTitleForm("create");
            userForm.addEventListener("submit", createUser);
            break;
    }

    function createUser(e) {
        e.preventDefault();
        let data = getCourseForm();
        if (data) {
            httpsService("API/course/new", "POST", data)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        location.href = "/courses";
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function updateUser(e) {
        e.preventDefault();
        let data = getCourseForm();
        data["id"] = getToken();
        console.log(data);
        if (data) {
            httpsService("API/course/edit", "PUT", data)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        location.href = "/courses";
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function getCourseForm() {
        console.log(courseType.value);
        let data = {
            courseName: courseName.value,
            author: courseAuthor.value,
            type: courseType.value,
            coin: courseLesson.value,
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
        courseType.value = course.type;
        courseLesson.value = course.coin;
        courseAuthor.value = course.author;
        courseCreateDate.value = course.createDate.split(".")[0];
        courseEditLastDate.value = course.updateDate.split(".")[0];
        courseThumbanil.value = course.thumbnail;
        courseDescription.value = course.description;
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
}