import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/https.js";
import Origin  from "../lib/lib-origin.js";
import { Priture } from "../commons/priture.js";
import { Validation } from "../commons/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // GET WRAPPER
    const Course = $("#Course");
    const Name = $("#Name");
    const Type = $("#Type");
    const Author = $("#Author");
    const CreateDate = $("#CreateDate");
    const UpdateDate = $("#UpdateDate");
    const Unit = $("#Unit");
    const Thumbnail = $("#Thumbnail");
    const Description = $("#Description");

    // PRITURE
    const wrapper = $("#wrapper-priture");

    // HIDDEN INPUT
    const hiddenGroup = $$(".hidden-group");

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

    if(type === "update") {
        (function() {
            // wrapper.classList.add("active");
            hiddenGroup.forEach((group) => {
                group.classList.add("active");
            })

            environment.payload.type = "Find";
            environment.payload.id = origin.parameter().token;

            https.FIND(environment.payload, token, environment.endpoint.course)
            .then((result) => {
                if(result?.length) {
                    binding(result[0]);
                }
            })
            .catch((err) => {
                throw err;
            })

        }())
    }

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

    function update(e) {
        e.preventDefault();
        if (this.valid) {
            https.PUT(token, setValue(), environment.endpoint.course)
            .then((result) => {
                if(result?.status) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    function binding(result) {
        Name.value = result?.Name;
        Author.value = result?.Author;
        Type.value = result?.Type;
        Unit.value = result?.Unit;
        CreateDate.value = result?.CreateDate.split(".")[0];
        UpdateDate.value = (result?.UpdateDate)? result?.UpdateDate.split(".")[0] : "";
        Description.value = result?.Description;
    }

    function setValue() {
        let date = new Date();
        return {
            Id: (origin.parameter().type === "create")? "" : origin.parameter().token,
            Func: (type === "create")? "Register" : "Edit",
            Name: Name.value,
            Author: Author.value,
            Type: Type.value,
            Unit: (type === "create")? 0 : Unit.value,
            CreateDate: (type === "create")? date.toISOString() : CreateDate.value,
            UpdateDate: (type === "create")? "" : date.toISOString(),
            Description: Description.value,
            Status: false
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

    $("#roll-back").addEventListener("click", function (e) {
        window.history.back();
    })
}