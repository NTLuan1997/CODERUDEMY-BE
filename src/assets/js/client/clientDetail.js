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
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // INFORMATION
    const Address = $("#Address");
    const Blank = $("#Blank")
    const Client = $('#Client');
    const Courses = $("#courses");
    const Content = $("#Content");
    const DateOfBirth = $("#DateOfBirth");
    const Email = $("#Email");
    const Name = $("#Name");
    const Gender = $("#Gender");
    const Phone = $("#Phone");
    const Password = $("#Password");
    const Swicthed = $("#Switched");
    const Status = $("#Status");
    const Executed = $("#Executed");
    const Title = $("#Title-page");
    const Thumbnail = $("#Thumbnail");
    const thumbnail = $("#thumbnail");
    const Upload = $("#Upload");
    const Register = $("#register");
    const UnRegister = $("#unregister");

    const Hidden = $$(".hidden");

    let rules = [{
            selector: "#Name",
            guides: [Validation.required()]
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
            selector: "#DateOfBirth",
            guides: [Validation.required()]
        },
        {
            selector: "#Phone",
            guides: [Validation.required(), Validation.phone()]
        },
        {
            selector: "#Address",
            guides: [Validation.required()]
        },
    ];

    let app = (function() {
        let RegisterCourse = [];
        let thumbnailOld = "";
        
        if(type === "update") {
            let payload = {
                client: {
                    id: origin.parameter().token,
                    type: "Find"
                },
                course: {
                    type: "Find",
                    status: true
                }
            };

            Promise.all([
                https.FIND(payload.client, token, environment.endpoint.client),
                https.FIND(payload.course, token, environment.endpoint.course)
            ])
            .then((result) => {
                let client = result[0][0];
                let courses = result[1];
                if(client) {
                    Address.value = client?.Address;
                    DateOfBirth.value = date.bindingToTemplate(client?.DateOfBirth);
                    Email.value = client?.Email;
                    Name.value = client?.Name;
                    Gender.value = client?.Gender;
                    Phone.value = client?.Phone;
                    Status.checked = client?.Status;
                    if(client?.Thumbnail) {
                        thumbnailOld = client?.Thumbnail;
                        thumbnail.setAttribute("src", `${environment.priture.url}/${client?.Thumbnail}`);
                    }

                    if(client?.RegisterCourse.length) {
                        RegisterCourse = client?.RegisterCourse;
                    }
                }

                if(courses.length) {
                    registerView().render(courses);
                    registerView().bindingEvent("Register");

                } else {
                    permission.setState({type: "course-blank"});
                }

            })
            .catch((err) => {
                throw err;
            })
        }

        function registerView() {
            function renderContent(parameter) {
                let template = "";
                template = parameter.reduce((accument, item) => {
                    return accument.concat(`
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="${item?._id}">
                            <label class="form-check-label">${item?.courseName}</label>
                        </div>
                    `);
                }, []).join(" ");
                Content.innerHTML = template;
            }

            return {
                bindingEvent: function(type) {
                    if(type === "Register") {
                        Register.addEventListener("click", function(e) {
                            if(Courses.value.includes("=")) {
                                if(RegisterCourse.length) {
                                    if(RegisterCourse.some((course) => course._id === Courses.value.split("=")[0])) {
                                        permission.setState({type: "register-already"});

                                    } else {
                                        RegisterCourse.push({"_id": Courses.value.split("=")[0], "courseName": Courses.value.split("=")[1]});
                                    }
                                } else {
                                    RegisterCourse.push({"_id": Courses.value.split("=")[0], "courseName": Courses.value.split("=")[1]});
                                }
    
                                Content.classList.add("active");
                                renderContent(RegisterCourse);
    
                                if(Blank.classList.contains("active")) {
                                    Blank.classList.remove("active");
                                }
                            }
                        })
                    }
                },
                render: function(courses) {
                    if(RegisterCourse.length) {
                        Content.classList.add("active");
                        renderContent(RegisterCourse);

                    } else {
                        Blank.classList.add("active");
                    }
                    
                    let template = `<option selected value="default">Danh mục khóa học</option>`;
                    template += courses.reduce((accument, item) => {
                        return accument.concat(`<option value="${item?._id}=${item?.Name}">${item?.Name}</option>`);
                    }, []).join("");

                    Courses.innerHTML = template;

                    Courses.addEventListener("change",  function(e) {
                        if(this.value !== "default") { 
                            Register.removeAttribute("disabled");

                        } else {
                            Register.setAttribute("disabled", true);
                        }
                    })
                }
            }
        }

        function getClient() {
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
                (Password.value)? payload.Password = Password.value : delete payload.Password;

                if(RegisterCourse.length) {
                    payload.RegisterCourse = RegisterCourse;
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

                    Hidden.forEach((item) => {
                        item.classList.add("active");
                    })
                    
                } else {
                    Executed.innerHTML = "Thêm mới";
                    Swicthed.classList.remove("active");
                    Thumbnail.classList.remove("active");
                    Title.innerHTML = "Thêm mới học viên";

                }
            },            
            BindEvent: function(callback) {
                if(type === "update") {
                    Status.addEventListener("change", callback().state);
                    Upload.addEventListener("change", callback().thumbnail);
                    Client.addEventListener("submit", callback().update);

                } else {
                    Client.addEventListener("submit", callback().create);
                }
            },
            Event: function() {
                return {
                    create : function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.POST(token, getClient(), environment.endpoint.client)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/client" : permission.setState(result);
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
                            https.PUT(token, getClient(), environment.endpoint.client)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/client" : permission.setState(result);
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
                            Status: this.checked,
                            Platform: "System",
                            Id: origin.parameter().token,
                            Type: "modified"
                        };

                        https.PUT(token, payload, environment.endpoint.client)
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
                                    Platform: "System",
                                    Id: origin.parameter().token,
                                    Type: "modified",
                                    Thumbnail: destination
                                }
                                return https.PUT(token, payload, environment.endpoint.client);
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
                    form: "#Client",
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