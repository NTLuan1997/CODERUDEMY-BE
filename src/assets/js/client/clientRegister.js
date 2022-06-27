import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { Permission } from "../lib/permission.js";

window.onload = function(e) {
    const cookie = new Cookie();
    const https = new HTTPS();
    const permission = new Permission();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const blank = $("#blank");
    const clientF = $("#client");
    const content = $("#content");
    const course = $("#course");
    const executed = $("#executed");
    const register = $("#register");
    const unregister = $("#unregister");
    const title = $("#title");
    const token = `Bearer ${cookie.get("Authentic")}`;

    const app = (function() {
        let client = [];
        let courses = [];
        let registerValue = [];

        let payload = {
            client: {
                id: localStorage.getItem("clientToken"),
                type: "Find"
            },
            course: {
                status: true,
                type: "Find"
            },
            upload: {
                Platform: "System",
                Type: "modified",
                Id: localStorage.getItem("clientToken"),
                RegisterCourse: []
            }
        };

        function Event() {
            return {
                register: function() {
                    register.addEventListener("click", function(e) {
                        e.preventDefault();
                        if(course.value !== "default") {
                            let id = course.value.split("=")[0];
                            let name = course.value.split("=")[1];
                            let registered = Number(course.value.split("=")[2]);

                            if(client.at(0)?.RegisterCourse.some((item) => item._id === id)) {
                                permission.setState({type: "register-already"});

                            } else {
                                client.at(0)?.RegisterCourse.push({_id: id, courseName: name});
                                registerValue.push({id: id, register: (registered + 1)});
                                render();
                            }

                        } else {
                            permission.setState({type: "choose-course"});
                        }
                    })
                },
                unRegister: function() {
                    unregister.addEventListener("click", function(e) {
                        let itemCourse = Array.from($$(".item-course"));
                        if(itemCourse.some((course) => course.checked === true)) {
                            itemCourse.forEach(function(item) {
                                if(item.checked) {
                                    for(let i = 0; i < client.at(0)?.RegisterCourse.length; i++) {
                                        if(client.at(0)?.RegisterCourse[i]._id === item.dataset.id) {
                                            client.at(0)?.RegisterCourse.splice(i, 1);
                                        }
                                    }
                                }
                            })
                            render();

                        } else {
                            permission.setState({type: "choose-course"});
                        }
                    })
                },
                upload: function() {
                    clientF.addEventListener("submit", function(e) {
                        e.preventDefault();
                        payload.upload.RegisterCourse = client.at(0)?.RegisterCourse;
                        https.PUT(token, payload.upload, environment.endpoint.client)
                        .then((result) => {
                            if(result?.status) {
                                let payload = {
                                    Func: "register",
                                    Register: registerValue
                                };

                                return https.PUT(token, payload, environment.endpoint.course);
                            } else {
                                permission.setState(result);
                            }
                        })
                        .then((result) => {
                            (result?.status)? window.location.href = "/web/client/detail?type=update" : permission.setState(result);
                        })
                        .catch((err) => {
                            throw err;
                        })
                    })
                }
            }
        }

        function viewOption() {
            let template = `<option selected value="default">Chọn thông tin khóa học</option>`;
            if(Array.isArray(courses)) {
                template += courses.reduce((accument, item) => {
                    return accument.concat(`<option value="${item?._id}=${item?.Name}=${item?.Register}">${item?.Name}</option>`);
                }, []).join(" ");
            }
            course.innerHTML = template;
        }

        function viewContent() {
            if(client.at(0)?.RegisterCourse.length) {
                blank.classList.remove("active");
                content.classList.add("active");
                render();

            } else {
                blank.classList.add("active");
                content.classList.remove("active");
            }
            Event().register();
            Event().unRegister();
            Event().upload();
        }

        function render() {
            if(client.at(0)?.RegisterCourse.length) {
                blank.classList.remove("active");
                content.classList.add("active");

                content.innerHTML = client.at(0)?.RegisterCourse.reduce((accument, item) => {
                    return accument.concat(
                        `   
                        <div class="d-flex align-items-center mb-1">
                            <input type="checkbox" class="mr-2 item-course" data-id="${item?._id}">
                            <p class="mb-0">${item?.courseName}</p>
                        </div>
                        `
                    );
    
                }, []).join(" ");
            } else {
                blank.classList.add("active");
                content.classList.remove("active");
            }
        }

        Promise.all([
            https.FIND(payload.client, token, environment.endpoint.client),
            https.FIND(payload.course, token, environment.endpoint.course)
        ])
        .then((result) => {
            client = result.at(0);
            courses = result.at(1);
        })
        .then(() => {
            viewOption();
            viewContent();
        })
        .catch((err) => {
            throw err;
        })

        return {
            BindInformation: function() {
                executed.innerHTML = "Cập nhật";
                title.innerHTML = "Đăng ký khóa học";
            }
        }
    })();

    app.BindInformation();
}