import { Cookie } from "../lib/cookie.js";
import DateTimes from "../lib/date.js";
import { HTTPS } from "../lib/https.js";
import Origin  from "../lib/lib-origin.js";
import { Priture } from "../lib/priture.js";
import { Permission } from "../lib/permission.js";
import { environment } from "../config/environment.js";
import { Validation } from "../lib/validation.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const date = new DateTimes();
    const https = new HTTPS();
    const origin = new Origin();
    const priture = new Priture();
    const permission = new Permission();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // INFORMATION
    const User = $("#User");
    const Name = $("#Name");
    const CreateDate = $("#CreateDate");
    const DateOfBirth = $("#DateOfBirth");
    const Email = $("#Email");
    const Gender = $("#Gender");
    const Phone = $("#Phone");
    const Swicthed = $("#Switched");
    const Status = $("#Status");
    const Address = $("#Address");
    const Role = $("#Role");

    const Executed = $("#Executed");
    const Title = $("#Title-page");
    const Thumbnail = $("#Thumbnail");
    const thumbnail = $("#thumbnail");
    const Upload = $("#Upload");

    let rules = [
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
    ];

    let app = (function() {
        let thumbnailOld = "";
        if(type === "update") {
            let payload = {
                id: origin.parameter().token,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.user)
            .then((result) => {
                if(result?.length) {
                    Address.value = result.at(0)?.Address;
                    CreateDate.value = date.bindingToTemplate(result.at(0)?.CreateDate);
                    DateOfBirth.value = date.bindingToTemplate(result.at(0)?.DateOfBirth);
                    Email.value = result.at(0)?.Email;
                    Name.value = result.at(0)?.Name;
                    Gender.value = result.at(0)?.Gender;
                    Phone.value = result.at(0)?.Phone;
                    Status.checked = result.at(0)?.Status;
                    Role.value = result.at(0)?.Role;
                    if(result.at(0)?.Thumbnail) {
                        thumbnailOld = result.at(0)?.Thumbnail;
                        thumbnail.setAttribute("src", `${environment.priture.url}/${result.at(0)?.Thumbnail}`);
                    }
                }
            })
            .catch((err) => {
                throw err;
            })
        }

        function getUser() {
            let date = new Date(DateOfBirth.value);
            let payload = {
                Address: Address.value,
                CreateDate: CreateDate.value,
                DateOfBirth: date.toISOString(),
                Email: Email.value,
                Gender:Gender.value,
                Name: Name.value,
                Phone: Phone.value,
                Status: true,
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
                payload.Id = origin.parameter().token;
                payload.Type = "modified";

                if(Password.value) {
                    payload.Password = Password.value;
                }

                delete payload.Status;
            }
            return payload;
        }

        return  {
            BindInformationPage: function() {
                if(type === "update") {
                    Executed.innerHTML = "Cập nhật thông tin";
                    Swicthed.classList.add("active");
                    Thumbnail.classList.add("active");
                    Title.innerHTML = "Chỉnh sửa thông tin";
                    
                } else {
                    Executed.innerHTML = "Thêm mới";
                    Swicthed.classList.remove("active");
                    Thumbnail.classList.remove("active");
                    Title.innerHTML = "Thêm mới người dùng";
                }
            },            
            BindEvent: function(callback) {
                if(type === "update") {
                    Status.addEventListener("change", callback().state);
                    Upload.addEventListener("change", callback().thumbnail);
                    User.addEventListener("submit", callback().update);

                } else {
                    User.addEventListener("submit", callback().create);
                }
            },
            Event: function() {
                return {
                    create : function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.POST(token, getUser(), environment.endpoint.user)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/user" : permission.setState(result);
                            })
                            .catch((err) => {
                                throw err;
                            })
                        } else {
                            permission.setState({type: "form-invalid"});
                        }
                    },
                    update: function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.PUT(token, getUser(), environment.endpoint.user)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/user" : permission.setState(result);
                            })
                            .catch((err) => {
                                throw err;
                            })
                        } else {
                            permission.setState({type: "form-invalid"});
                        }
                    },
                    state: function(e) {
                        let payload = {
                            Id: origin.parameter().token,
                            Type: "modified",
                            Status: this.checked,
                        };

                        https.PUT(token, payload, environment.endpoint.user)
                        .then((result) => {
                            (result?.status)? window.location.reload(): permission.setState(result);
                        })
                        .catch((err) => {
                            throw err;
                        })
                    },
                    thumbnail: function(e) {
                        priture.upload(environment.priture.url, this.files[0], "clients", thumbnailOld)
                        .then((result) => {
                            let {status, message, destination} = result;
                            if(status) {
                                let payload = {
                                    Id: origin.parameter().token,
                                    Type: "modified",
                                    Thumbnail: destination
                                }
                                return https.PUT(token, payload, environment.endpoint.user);
                            } else {
                                permission.setState({type: "upload-priture"});
                            }
                        })
                        .then((result) => {
                            (result?.status)? window.location.reload(): permission.setState(result);
                        })
                        .catch((err) => {
                            throw err;
                        })
                    }
                }
            },
            validation: function() {
                if(type === "update") {
                    rules.push(...[
                        {
                            selector: "#Password",
                            guides: [Validation.password()],
                            optional: true,
                        },
                        {
                            selector: "#ConfirmPassword",
                            guides: [Validation.ConfirmPassword($("#Password"))],
                            linked: {"element":$("#Password"), "status": true},
                        }
                    ]);
                }

                Validation({
                    form: "#User",
                    selectorError: ".form-message",
                    rules: rules
                });
            }
        }
    })();

    app.BindInformationPage();
    app.validation();
    app.BindEvent(app.Event);
}