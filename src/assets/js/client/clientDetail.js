import {getType, getToken, permission, convertDate} from "../commons/common.js";
import {environment} from "../config/environment.js";
import {Validation} from "../commons/validation.js";
import {httpsService} from "../commons/httpService.js";
import {Priture} from "../commons/priture.js";
import {Render} from "../commons/render.js";

window.onload = function (e) {
    const render = new Render();
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // INFORMATION
    let Address = $("#Address");
    let Client = $('#Client');
    let Code = $("#Code");
    let DateOfBirth = $("#DateOfBirth");
    let Email = $("#Email");
    let Name = $("#Name");
    let Gender = $("#Gender");
    let Phone = $("#Phone");
    let Password = $("#Password");
    
    // PRITURE
    let WrapperPriture = $("#wrapper-priture");
    let UploadThumbnail = $("#upload-thumbnail");
    let Thumbnail = $("#thumbnail");


    // COURSE REGISTER
    let ClientRegister = $("#page-detail-client-register");
    let Course = $("#Course");
    let Register = $("#register");
    let Content = $("#register-content");
    let UnRegister = $("#unRegister");
    let UploadRegister = $("#upload-register");
    let CourseAll = $("#check-all-course");
    let CourseItems = null;

    // PERMISSION
    let rollBack = $("#roll-back");
    let toasts = $$(".modal-toasts")[0];

    //VALIDATION
    Validation({
        form: "#Client",
        selectorError: ".form-message",
        rules: [
            {
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
            }
        ]
    });

    // AUTO CALL TO PAGE UPDATE
    if (getType() == "update") {
        ClientRegister.classList.add("active");
        WrapperPriture.classList.add("active");

        (function () {
            httpsService(`API/client/client/${getToken()}`, "GET", null)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if(res.hasOwnProperty("Client")) {
                        setCourseForm(res.Client);
                        localStorage.removeItem("client-register");
                        if(res.Client.RegisterCourse.length) {
                            localStorage.setItem("client-register", JSON.stringify(res.Client.RegisterCourse));
                        }
                        render.clientCourseRegister(Content, res.Client.RegisterCourse);
                        CourseItems = $$("input[name='course-items']");
                    }

                    if(res.hasOwnProperty("Courses")) {
                        localStorage.setItem("Courses", JSON.stringify(res.Courses));
                        render.option(Course, res.Courses);
                    }
                })
                .then(() => {
                    if(CourseItems.length) {
                        let converCourseItem = new Array();
                        CourseItems.forEach((e) => converCourseItem.push(e));
                        
                        for(let item = 0; item < CourseItems.length; item++) {
                            CourseItems[item].addEventListener("change", function(checkbox) {
                                if(checkbox.target.checked) {
                                    UnRegister.removeAttribute("disabled");

                                } else {
                                    if(converCourseItem.every((item) => item.checked == false)) {
                                        UnRegister.setAttribute("disabled", false);
                                    }

                                    if(converCourseItem.some((item) => item.checked == false)) {
                                        CourseAll.checked = false;
                                    }
                                }

                                if(converCourseItem.every((item) => item.checked == true)) {
                                    CourseAll.checked = true;
                                }
                            })
                        }
                    }

                })
                .catch((err) => {
                    throw err;
                })
        }());
    }

    // METHOD UPLOAD INFORMATION
    switch (getType()) {
        case "update":
            setTitleForm("update");
            UploadThumbnail.addEventListener("change", uploadThumbnail);
            Client.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Client.addEventListener("submit", save);
            break;
    }

    function save(e) {
        e.preventDefault();
        if (this.valid) {
            let client = getCourseForm();
            client.Type = 'Create';
            if (client) {
                httpsService("API/client/client", "POST", client)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        res.status ?
                            location.href = "/clients" :
                            permission(toasts, res);
                    })
                    .catch((err) => {
                        throw err;
                    })
            }
        }
    }

    function update(e) {
        e.preventDefault();
        if (this.valid) {
            let client = getCourseForm();
            client.Type = 'Update';
            if (client) {
                httpsService("API/client/client", "PUT", client)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        res.status ?
                            location.href = "/clients" :
                            permission(toasts, res);
                    })
                    .catch((err) => {
                        throw err;
                    })
            }
        }
    }

    // GETTER - SETTER INFORMATION
    function getCourseForm() {
        let data = {
            Code: Code.value,
            Name: Name.value,
            Email: Email.value,
            Password: (Password.value)? Password.value : 'P@ssword12345',
            Gender: Gender.value,
            DateOfBirth: DateOfBirth.value,
            Phone: Phone.value,
            Address: Address.value
        }
        return data;
    }

    function setCourseForm(client) {
        Thumbnail.setAttribute("src", (client.Thumbnail)? `${environment.upload.server}/${client.Thumbnail}`: "/static/img/thumbnail_default.jpg");
        Object.assign(environment.client, client);
        setForm(client);
    }

    function setForm(client) {
        let dateOfBirth = new Date(client.DateOfBirth.split(".")[0]);
        Code.value = client._id;
        Name.value = client.Name;
        Email.value = client.Email;
        Password.value = client.Password;
        DateOfBirth.value = convertDate(dateOfBirth);
        Phone.value = client.Phone;
        Address.value = client.Address;
        for (let gender of Gender) {
            if (gender.value == client.Gender) {
                gender.setAttribute("selected", true);
            }
        }
    }


    // UPLOAD PRITURE
    function uploadThumbnail() {
        priture.clientThumbnail(this?.files[0])
        .then((res) => {
            if(res.status){
                let body = {
                    "_id": environment.client._id,
                    "Type": "Thumbnail",
                    "Thumbnail": res.destination
                };
                return httpsService("API/client/client-thumbnail", "PUT", body);
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.status) {
                window.location.reload();
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    // UPLOAD COURSE REGISTER
    if(getType() === "update") {
        Course.addEventListener("change", function(e) {
            if(this.value !== "default") {
                Register.removeAttribute("disabled");

            } else {
                Register.setAttribute("disabled", true);
            }
        })

        Register.addEventListener("click", function(e) {
            let Courses = JSON.parse(localStorage.getItem("Courses"));
            let temporary = [];

            if(localStorage.getItem("client-register")) {
                UploadRegister.removeAttribute("disabled");
                temporary = JSON.parse(localStorage.getItem("client-register"));

                Courses.forEach((e) => {
                    if(e?._id === Course.value) {
                        if(!temporary.some(item => item?._id ==  Course.value)) {
                            temporary?.push(e);

                        } else {
                            alert("Khóa học đã đăng ký");
                        }
                    }
                })
                localStorage.setItem("client-register", JSON.stringify(temporary));
                render.clientCourseRegister(Content, temporary);

            } else {
                if(localStorage.getItem("client-register")) {
                    temporary = JSON.parse(localStorage.getItem("client-register"));
                }

                Courses.forEach((e) => {
                    if(e?._id === Course.value) {
                        if(!temporary.length) {
                            temporary?.push(e);

                        } else {
                            if(!temporary.some(item => item?._id ==  Course.value)) {
                                temporary?.push(e);

                            } else {
                                alert("Khóa học đã đăng ký");
                            }
                        }
                    }
                })
                render.clientCourseRegister(Content, temporary);
                localStorage.setItem("client-register", JSON.stringify(temporary));
                UploadRegister.removeAttribute("disabled");
            }
            Register.setAttribute("disabled", true);
            CourseItems = $$("input[name='course-items']");
            toggleRegister(CourseItems);

        })

        CourseAll.addEventListener("change", function(e) {
            let _this = this;
            if(this.checked) {
                UnRegister.removeAttribute("disabled");
            } else {
                UnRegister.setAttribute("disabled", false);
            }

            CourseItems.forEach(function(e) {
                e.checked = _this.checked;
            })
        })

        UnRegister.addEventListener("click", function(e) {
            let team = [];
            let clientCourseRegisters = JSON.parse(localStorage.getItem("client-register"));

            if(CourseAll.checked) {
                localStorage.setItem("client-register", JSON.stringify([]));
                UploadRegister.removeAttribute("disabled");

            } else {
                CourseItems.forEach((e, index) => {
                    if(e.checked) {
                        team = clientCourseRegisters.reduce((accument, currentValue) => {
                            if(currentValue._id !== e.value) {
                                return accument.concat(currentValue);
                            }
                            return accument;
                        }, [])
                        localStorage.setItem("client-register", JSON.stringify(team));
                    }
                })
                UploadRegister.removeAttribute("disabled");
            }
            render.clientCourseRegister(Content, JSON.parse(localStorage.getItem("client-register")));
        })

        function toggleRegister(CourseItems) {
            if(CourseItems.length) {
                let converCourseItem = new Array();
                CourseItems.forEach((e) => converCourseItem.push(e));
                
                for(let item = 0; item < CourseItems.length; item++) {
                    CourseItems[item].addEventListener("change", function(checkbox) {
                        if(checkbox.target.checked) {
                            UnRegister.removeAttribute("disabled");

                        } else {
                            if(converCourseItem.every((item) => item.checked == false)) {
                                UnRegister.setAttribute("disabled", false);
                            }

                            if(converCourseItem.some((item) => item.checked == false)) {
                                CourseAll.checked = false;
                            }
                        }

                        if(converCourseItem.every((item) => item.checked == true)) {
                            CourseAll.checked = true;
                        }
                    })
                }
            }
        }

        function uploadCourseRegister() {
            let body = {};
            body.register = JSON.parse(localStorage.getItem("client-register"));
            body.Type = "Register-course";
            body.id = getToken();

            httpsService("API/client/client-courses", "PUT", body)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.status) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                throw err;
            })
        }

        UploadRegister.addEventListener("click", function(e) {
            if(localStorage.getItem("client-register")) {
                uploadCourseRegister();
            } else {
                alert("Upload không thành công");
            }
        })
    }

    // SETTER TITLE FORM
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

    rollBack.addEventListener("click", function (e) {
        window.history.back();
    })
}