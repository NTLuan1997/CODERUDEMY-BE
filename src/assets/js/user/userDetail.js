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
    const CreateDate = $("#CreateDate");
    const DateOfBirth = $("#DateOfBirth");
    const Email = $("#Email");
    const Gender = $("#Gender");
    const Phone = $("#Phone");
    const Address = $("#Address");
    const Role = $("#Role");

    // PRITURE
    let ThumbnailOld = "";
    const wrapper = $("#wrapper-priture");
    const ThumbnailUpload = $("#upload-thumbnail");
    const Thumbnail = $("#thumbnail");

    // SWITCH
    const switched = $("#switched");
    const Status = $("#Status");

    // SECURITY
    const SecurityInformation = $("#security-information");
    const Security = $("#Security");
    const Password = $("#Password");

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

    Validation({
        form: "#Security",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#Password",
                guides: [Validation.required(), Validation.minLength(6), Validation.maxLength(15), Validation.password()]
            },
            {
                selector: "#ComformPassword",
                guides: [Validation.required(), Validation.comformPassword(Password)]
            }
        ]
    })

    if (type == "update") {
        (function () {
            switched.classList.add("active");
            wrapper.classList.add("active");
            SecurityInformation.classList.add("active");
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
            Status.addEventListener("change", stated);
            ThumbnailUpload.addEventListener("change", upload);
            User.addEventListener("submit", update);
            Security.addEventListener("submit", update);
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
        if(this.id === "User") {
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

        if(this.id === "Security") {
            if(Security.valid) {
                let payload = {
                    Id: origin.parameter().token,
                    Type: "Security",
                    Password: Password.value
                };

                https.PUT(token, payload, environment.endpoint.user)
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
    }

    function stated(e) {
        let payload = {
            Id: origin.parameter().token,
            Type: "Status",
            Status: this.checked
        }

        https.PUT(token, payload, environment.endpoint.user)
        .then((result) => {
            if(result?.status) {
                window.location.reload();
            }
        })
        .catch((err) => {
            throw err;
        })
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
        CreateDate.value = date.bindingToTemplate(result?.CreateDate);
        DateOfBirth.value =  date.bindingToTemplate(result?.DateOfBirth);
        Email.value = result?.Email;
        Gender.value = result?.Gender;
        Phone.value = result?.Phone;
        Address.value = result?.Address;
        Role.value = result?.Role;
        Status.checked = result?.Status;
    }

    function setValue() {
        let date = new Date(DateOfBirth.value);
        let payload = {
            Address: Address.value,
            CreateDate: CreateDate.value,
            DateOfBirth: date.toISOString(),
            Email: Email.value,
            Gender:Gender.value,
            Name: Name.value,
            Phone: Phone.value,
            Status: false,
            Role: Role.value,
            Type: "",
        };

        if(type === "create") {
            let createDate = new Date();
            payload.CreateDate = createDate.toISOString();
            payload.Password = "P@ssword123";
            payload.Type = "Register";
            payload.Thumbnail = "";
        }

        if(type === "update") {
            payload.Status = Status.checked;
            payload.Id = origin.parameter().token;
            payload.Type = "Edit";
        }

        return payload;
    }

    function setTitleForm(type) {
        let title = $$(".title-page")[0];
        let subButton = $$(".users-detail--btn")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới người dùng";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật thông tin";
        }
    }
}