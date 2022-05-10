import {getType, getToken, permission, convertDate} from "../commons/common.js";
import {environment} from "../config/environment.js";
import {upload} from "../commons/upload.js";
import {Validation} from "../commons/validation.js";
import {httpsService} from "../commons/httpService.js";
import {Render} from "../commons/render.js";

window.onload = function (e) {
    const render = new Render();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let Address = $("#Address");
    let Client = $('#Client');
    let Code = $("#Code");
    let DateOfBirth = $("#DateOfBirth");
    let Email = $("#Email");
    let Name = $("#Name");
    let Gender = $("#Gender");
    let Phone = $("#Phone");
    let Password = $("#Password");
    
    // GET WRAPPER UPLOAD THUMBNAIL
    let Priture = $("#wrapper-priture");
    let Upload = $("#upload-priture");
    let Thumbnail = $("#image-priture");


    // GET WRAPPER UPLOAD COURSE REGISTER
    let CourseWrapper = $("#Course-wrapper");
    let Course = $("#Course");
    let CourseRegister = $("#Course-register");
    let CourseContent = $("#course-content");
    let CourseUpload = $("#upload-course-register");
    // let CourseCheckAll = $("#Course-all");


    let toasts = $$(".modal-toasts")[0];

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

    if (getType() == "update") {
        // SHOW SECTION PAGE UPDATE
        CourseWrapper.classList.add("active");
        Priture.classList.add("active");

        // CALL API PAGE UPDATE
        (function () {
            httpsService(`API/client/client/${getToken()}`, "GET", null)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if(res.hasOwnProperty("Client")) {
                        setCourseForm(res.Client);
                        if(res.Client.RegisterCourse.length) {
                            localStorage.setItem("client-register", JSON.stringify(res.Client.RegisterCourse));
                            // CourseUpload.removeAttribute("disabled");
                        } else {
                            localStorage.removeItem("client-register");
                        }
                        render.clientCourseRegister(CourseContent, res.Client.RegisterCourse);
                    }

                    if(res.hasOwnProperty("Courses")) {
                        localStorage.setItem("Courses", JSON.stringify(res.Courses));
                        render.option(Course, res.Courses);

                    }
                })
                .catch((err) => {
                    throw err;
                })
        }());
    }

    switch (getType()) {
        case "update":
            setTitleForm("update");
            Upload.addEventListener("change", uploadThumbnail);
            Client.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Client.addEventListener("submit", save);
            break;
    }

    function save(e) {
        console.log("Save");
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

    function uploadThumbnail() {
        let form = new FormData();
        form.append("thumbnail", this?.files[0]);
        form.append("Type", "Client");

        upload(form)
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

    /**
     * 
     * Update course register
     */

    if(getType() === "update") {
        Course.addEventListener("change", function(e) {
            if(this.value !== "default") {
                CourseRegister.removeAttribute("disabled", false);

            } else {
                CourseRegister.setAttribute("disabled", false);
            }
        })

        CourseRegister.addEventListener("click", function(e) {
            let Courses = JSON.parse(localStorage.getItem("Courses"));
            let register = [];

            if(localStorage.getItem("register")) {
                CourseUpload.removeAttribute("disabled");
                register = JSON.parse(localStorage.getItem("register"));

                if(register.some((e) => e?._id === Course.value)) {
                    alert("Khóa học đã đăng ký");

                } else {
                    Courses.forEach((e) => {
                        if(e?._id === Course.value) {
                            register?.push(e);
                        }
                    })
                    render.clientCourseRegister(CourseContent, register);
                    localStorage.setItem("register", JSON.stringify(register));
                }

            } else {
                if(localStorage.getItem("client-register")) {
                    Courses = JSON.parse(localStorage.getItem("client-register"));
                }

                Courses.forEach((e) => {
                    if(e?._id === Course.value) {
                        register?.push(e);
                    }
                })
                render.clientCourseRegister(CourseContent, register);
                localStorage.setItem("register", JSON.stringify(register));
                CourseUpload.removeAttribute("disabled");
            }
        })

        CourseUpload.addEventListener("click", function(e) {
            if(localStorage.getItem("register")) {
                let client = {};
                client.register = JSON.parse(localStorage.getItem("register"));
                client.Type = "Register-course";
                client.id = getToken();

                httpsService("API/client/client-courses", "PUT", client)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if(data.status) {
                        localStorage.removeItem("register");
                    }
                    
                })
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    throw err;
                })
            }
        })
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

    // $("#come-back").addEventListener("click", function (e) {
    //     window.history.back();
    // })
}