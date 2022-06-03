import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/https.js";
import Origin  from "../lib/lib-origin.js";
import { Validation } from "../commons/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // GET WRAPPER
    let Course = $("#Course");
    let Name = $("#Name");
    let Type = $("#Type");
    let Author = $("#Author");
    let CreateDate = $("#CreateDate");
    let EditDate = $("#EditDate");
    let AmountUnit = $("#AmountUnit");
    let Thumbnail = $("#Thumbnail");
    let Description = $("#Description");


    Validation({
        form: "#Course",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#Name",
                guides: [Validation.required()]
            },
            {
                selector: "#Type",
                guides: [Validation.required()]
            },
            {
                selector: "#Author",
                guides: [Validation.required()]
            },
            // {
            //     selector: "#CreateDate",
            //     guides: [Validation.required()]
            // },
            // {
            //     selector: "#EditDate",
            //     guides: [Validation.required()]
            // },
            // {
            //     selector: "#Thumbnail",
            //     guides: [Validation.required()]
            // },
            {
                selector: "#Description",
                guides: [Validation.required()]
            }
        ]
    });


//     if (getType() == "update") {
//         (function () {
//             httpsService("API/course/course-single", "POST", { id: getToken() })
//                 .then((data) => {
//                     return data.json();
//                 })
//                 .then((data) => {
//                     setCourseForm(data);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//         }());
//     }

    switch (type) {
        case "update":
            setTitleForm("update");
            Course.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Course.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        if (this.valid) {
            https.POST(token, setValue(), environment.endpoint.course)
            .then((result) => {
                if(result?.status) {
                    window.location.href = "/web/course";
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }

//     function updateUser(e) {
//         e.preventDefault();
//         if (this.valid) {
//             let data = getCourseForm();
//             data["id"] = getToken();
//             if (data) {
//                 httpsService("API/course/course-edit", "PUT", data)
//                     .then((res) => {
//                         return res.json();
//                     })
//                     .then((data) => {
//                         data.status ?
//                             location.href = "/courses" :
//                             permission(toasts, data);
//                     })
//                     .catch((err) => {
//                         console.error(err);
//                     })
//             }
//         }
//     }

    function binding(result) {
        // Name.value = result?.Name;
        // DateOfBirth.value =  date.bindingToTemplate(result?.DateOfBirth);
        // Email.value = result?.Email;
        // Password.value = result?.Password;
        // Gender.value = result?.Gender;
        // Phone.value = result?.Phone;
        // Address.value = result?.Address;
        // Role.value = result?.Role;
        // (result?.Status)? $("#action").checked = true : $("#no-action").checked = true;
    }

    function setValue() {
        let date = new Date();
        return {
            Func: (type === "create")? "Register" : "Edit",
            Name: Name.value,
            Author: Author.value,
            Type: Type.value,
            Unit: 0,
            CreateDate: (type === "create")? date.toISOString() : CreateDate.value,
            UpdateDate: "",
            Description: Description.value,
            Thumbnail: "",
            Status: true
        }
    }

//     function getCourseForm() {
//         let data = {
//             courseName: courseName.value,
//             author: courseAuthor.value,
//             type: courseType.value,
//             unit: (courseUnit.value) ? courseUnit.value : 0,
//             createDate: courseCreateDate.value,
//             updateDate: courseEditLastDate.value,
//             description: courseDescription.value,
//             thumbnail: courseThumbanil.value,
//         }
//         return data;
//     }

//     function setCourseForm(course) {
//         courseCode.value = course["_id"];
//         courseName.value = course.courseName;
//         courseUnit.value = course.unit;
//         courseAuthor.value = course.author;
//         courseCreateDate.value = course.createDate.split(".")[0];
//         courseEditLastDate.value = course.updateDate.split(".")[0];
//         courseThumbanil.value = course.thumbnail;
//         courseDescription.value = course.description;
//         for (let type of courseType) {
//             if (type.value == course.type) {
//                 type.setAttribute("selected", true);
//             }
//         }
//     }

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

//     $("#come-back").addEventListener("click", function (e) {
//         window.history.back();
//     })
}