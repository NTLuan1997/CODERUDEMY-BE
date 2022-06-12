import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";
import Origin from "../lib/lib-origin.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const Lesson = $("#Lesson");
    const Name = $("#Name");
    const Content = $("#Textarea");

    const date = new Date();
    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;
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
            }

            if(type === "update") { }
        }());

    switch(type) {
        case "update":
            setTitleForm("update");
            Lesson.addEventListener("submit", updateLesson);
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

//     function updateLesson(e) {
//         e.preventDefault();
//     }

    function setValue() {
        let payload = {
            Content: Content.value,
            CreateDate: date.toISOString(),
            Name: Name.value,
            Status: false,
            Thumbnail: "",
            UnitId: unitToken,
            UpdateDate: "",
        }

        if(type === "update") {
            payload.Type = "Edit";
        }

        if(type === "create") {
            payload.Type = "CreateLesson";
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