import { Cookie } from "../lib/cookie.js";
import DateTimes from "../lib/date.js";
import { HTTPS } from "../commons/https.js";
import Origin  from "../lib/lib-origin.js";
import { Priture } from "../commons/priture.js";
import { environment } from "../config/environment.js";
import { Validation } from "../commons/validation.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const date = new DateTimes();
    const https = new HTTPS();
    const origin = new Origin();
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // INTERACTION
    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;
    const User = $("#User");
    const Name = $("#Name");
    const DateOfBirth = $("#DateOfBirth");
    const Email = $("#Email");
    const Password = $("#Password");
    const Gender = $("#Gender");
    const Phone = $("#Phone");
    const Address = $("#Address");
    const Role = $("#Role");

    // PRITURE
    let ThumbnailOld = "";
    const wrapper = $("#wrapper-priture");
    const ThumbnailUpload = $("#upload-thumbnail");
    const Thumbnail = $("#thumbnail");

    Validation({
        form: "#User",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#Name",
                guides: [Validation.required()]
            },
            {
                selector: "#DateOfBirth",
                guides: [Validation.required(), Validation.dateOfBirth(0, 80)]
            },
            {
                selector: "#Email",
                guides: [Validation.required(), Validation.isEmail()]
            },
            {
                selector: "#Gender",
                guides: [Validation.required()]
            },
            {
                selector: "#Phone",
                guides: [Validation.required()]
            },
            {
                selector: "#Address",
                guides: [Validation.required()]
            },
            {
                selector: "#Role",
                guides: [Validation.required()]
            }
        ]
    });

    if (type == "update") {
        (function () {
            wrapper.classList.add("active");
            environment.payload.type = "Find";
            environment.payload.id = origin.parameter().token;
            https.FIND(environment.payload, token, environment.endpoint.user)
            .then((result) => {
                if(result.length) {
                    binding(result.at(0));
                }
            })
            .catch((err) => {
                throw err;
            })
        }());
    }

    switch (type) {
        case "update":
            setTitleForm("update");
            ThumbnailUpload.addEventListener("change", upload);
            User.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            User.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        if(User.valid) {
            https.POST(token, setValue(), environment.endpoint.user)
            .then((result) => {
                if(result?.status) { 
                    window.location.href = "/web/user";
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    function update(e) {
        e.preventDefault();
        if(User.valid) {
            https.PUT(token, setValue(), environment.endpoint.user)
            .then((result) => {
                if(result?.status) {
                    window.location.href = "/web/user";
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    function upload(e) {
        if(token) {
            priture.upload(environment.priture.url, this?.files[0], "users", ThumbnailOld)
            .then((result) => {
                let {status, message, destination} = result;
                if(status) {
                    let payload = {
                        Id: origin.parameter().token,
                        Type: "Thumbnail",
                        Destination: destination
                    }
                    return https.PUT(token, payload, environment.endpoint.user);
                }
            })
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
        ThumbnailOld = result?.Thumbnail;
        let thumbnail = (ThumbnailOld)? `${environment.priture.url}/${ThumbnailOld}` : "/static/img/thumbnail_default.jpg";
        Thumbnail.setAttribute("src", thumbnail);

        Name.value = result?.Name;
        DateOfBirth.value =  date.bindingToTemplate(result?.DateOfBirth);
        Email.value = result?.Email;
        Password.value = result?.Password;
        Gender.value = result?.Gender;
        Phone.value = result?.Phone;
        Address.value = result?.Address;
        Role.value = result?.Role;
        (result?.Status)? $("#action").checked = true : $("#no-action").checked = true;
    }

    function setValue() {
        let date = new Date(DateOfBirth.value);
        return {
            Type: (type === "create")? "Register" : "Edit",
            Name: Name.value,
            DateOfBirth: date.toISOString(),
            Email: Email.value,
            Password: (Password.value)? Password.value : "P@ssword123",
            Gender:Gender.value,
            Phone: Phone.value,
            Address: Address.value,
            Role: Role.value,
            Thumbnail: "",
            Status: ($("input[name='status']:checked")?.value === "action") ? true : false,
        }
    }

    function setTitleForm(type) {
        let title = $$(".users-detail--title")[0];
        let subButton = $$(".users-detail--btn")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới người dùng";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật";
        }
    }

    $("#roll-back").addEventListener("click", function(e) {
        window.history.back();
    })
}