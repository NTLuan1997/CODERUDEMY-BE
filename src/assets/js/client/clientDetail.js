import { Cookie } from "../lib/cookie.js";
import DateTimes from "../lib/date.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin  from "../lib/lib-origin.js";
import { Permission } from "../lib/permission.js";
import { Priture } from "../lib/priture.js";
import { Validation } from "../lib/validation.js";

window.onload = function(e) {
    const cookie = new Cookie();
    const date = new DateTimes();
    const https = new HTTPS();
    const origin = new Origin();
    const permission = new Permission();
    // const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    let Address = $("#Address");
    let Client = $('#Client');
    let Code = $("#Code");
    let DateOfBirth = $("#DateOfBirth");
    let Email = $("#Email");
    let Name = $("#Name");
    let Gender = $("#Gender");
    let Phone = $("#Phone");
    let Password = $("#Password");

    // Validation({
    //     form: "#Client",
    //     selectorError: ".form-message",
    //     rules: [
    //         {
    //             selector: "#Name",
    //             guides: [Validation.required()]
    //         },
    //         {
    //             selector: "#Email",
    //             guides: [Validation.required(), Validation.isEmail()]
    //         },
    //         {
    //             selector: "#Gender",
    //             guides: [Validation.required()]
    //         },
    //         {
    //             selector: "#DateOfBirth",
    //             guides: [Validation.required()]
    //         },
    //         {
    //             selector: "#Phone",
    //             guides: [Validation.required(), Validation.phone()]
    //         },
    //         {
    //             selector: "#Address",
    //             guides: [Validation.required()]
    //         }
    //     ]
    // });

    let app = (function() {
        if(type === "update") {
            let payload = {
                id: origin.parameter().token,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.client)
            .then((result) => {
                binding(result.at(0));
            })
            .catch((err) => {
                throw err;
            })
        }
    })();

    switch (type) {
        case "update":
            setTitleForm("update");
            // ThumbnailUpload.addEventListener("change", pritureUpload);
            Client.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Client.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        // if (this.valid) {}
        https.POST(token, setValue(), environment.endpoint.client)
        .then((result) => {
            (result?.status)? window.location.href = "/web/client" : permission.setState(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    function update(e) {
        e.preventDefault();
        // if (this.valid) {}
        https.PUT(token, setValue(), environment.endpoint.client)
        .then((result) => {
            (result?.status)? window.location.href = "/web/client" : permission.setState(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    function binding(result) {
        Address.value = result?.Address;
        DateOfBirth.value = date.bindingToTemplate(result?.DateOfBirth);
        Email.value = result?.Email;
        Name.value = result?.Name;
        Gender.value = result?.Gender;
        Phone.value = result?.Phone;
    }

    function setValue() {
        let payload = {
            Address: Address.value,
            DateOfBirth: DateOfBirth.value,
            Email: Email.value,
            Name: Name.value,
            Gender: Gender.value,
            Platform: "System",
            Phone: Phone.value,
            Password: "P@ssword123",
            RegisterCourse: []
        }

        if(type === "create") {
            payload.Type = "Register";
            payload.Status = true;
            payload.Thumbnail = "";
        }

        if(type === "update") {
            payload.Type = "modified";
            payload.Id = origin.parameter().token;
            
            delete payload.RegisterCourse;
            delete payload.Password;
        }
        
        return payload;
    }

    function setTitleForm(type) {
        let title = $$(".page-detail--title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới học viên";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật thông tin";
        }
    }
}