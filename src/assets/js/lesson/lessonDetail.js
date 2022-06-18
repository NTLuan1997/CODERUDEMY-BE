import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin from "../lib/lib-origin.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const Lesson = $("#Lesson");
    const Code = $("#Code");
    const Content = $("#Textarea");
    const CreateDate = $("#CreateDate");
    const Name = $("#Name");

    const Switched = $("#switched");
    const Status = $("#Status");

    const date = new Date();
    const hiddenGroup = $$(".hidden-group");
    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;
    let lessonId = "";
    let unitToken = "";

//     Validation({
//         form: "#lesson-detail",
//         selectorError: ".form-message",
//         rules: [
//             {
//                 selector: "#lesson-name",
//                 guides: [Validation.required()]
//             },
//             {
//                 selector: "#lesson-content",
//                 guides: [Validation.required()]
//             },
//             {
//                 selector: "#lesson-thumbanil",
//                 guides: [Validation.required()]
//             },
//             {
//                 selector: "#lesson-create-date",
//                 guides: [Validation.required()]
//             },
//             {
//                 selector: "#lesson-edit-last-date",
//                 guides: [Validation.required()]
//             }
//         ]
//     });

        (function () {
            if(localStorage.getItem("UnitToken")) {
                unitToken = localStorage.getItem("UnitToken");
                Code.value = unitToken;
            }

            if(type === "update") {
                Switched.classList.add("active");

                hiddenGroup.forEach((group) => {
                    group.classList.add("active");
                })

                lessonId = origin.parameter().token;

                let payload = {
                    id: lessonId,
                    type: "Find"
                }

                https.FIND(payload, token, environment.endpoint.lesson)
                .then((result) => {
                    binding(result.at(0));
                })
                .catch((err) => {
                    throw err;
                })
            }
        }());

    switch(type) {
        case "update":
            setTitleForm("update");
            Status.addEventListener("change", state);
            Lesson.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Lesson.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        // if (this.valid) { }
        https.POST(token, setValue(), environment.endpoint.lesson)
        .then((result) => {
            if(result?.status) {
                window.location.href = "/web/course/unit/lesson";
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    function update(e) {
        e.preventDefault();
        // if (this.valid) { }
        https.PUT(token, setValue(), environment.endpoint.lesson)
        .then((result) => {
            if(result?.status) {
                window.location.href = "/web/course/unit/lesson";
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    function state(e) {
        e.preventDefault();
        let payload = {
            Type: "modified",
            Id: lessonId,
            Status: this.checked,
            UpdateDate: date.toISOString(),
        }

        https.PUT(token, payload, environment.endpoint.lesson)
        .then((result) => {
            if(result?.status) {
                window.location.href = "/web/course/unit/lesson";
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    function binding(result) {
        CreateDate.value = result?.CreateDate.split(".")[0];
        Name.value = result?.Name;
        Status.checked = result?.Status;
        UpdateDate.value = (result?.UpdateDate) ? result?.UpdateDate.split(".")[0] : null;
        tinymce.activeEditor.setContent(result?.Content);
    }

    function setValue() {
        let payload = {
            Content: Content.value,
            CreateDate: date.toISOString(),
            Name: Name.value,
            Status: true,
            UnitId: unitToken,
            UpdateDate: "",
        }

        if(type === "create") {
            payload.Type = "createLesson";
            payload.Thumbnail = "";
        }

        if(type === "update") {
            payload.Type = "modified";
            payload.Id = lessonId;
            payload.UpdateDate = date.toISOString();

            delete payload.CreateDate;
            delete payload.Status;
        }

        return payload;
    }


    function setTitleForm(type) {
        let title = $$(".information-title")[0];
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