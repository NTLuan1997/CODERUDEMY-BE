import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin from "../lib/lib-origin.js";
import { Permission } from "../lib/permission.js";
import { Validation } from "../lib/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const permission = new Permission();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // INFORMATION
    const Unit = $("#unit");
    const Description = $("#Textarea");
    const Author = $("#author");
    const Code = $("#code");
    const CreateDate = $("#createDate");
    const Lesson = $("#lesson");
    const Name = $("#name");
    const Switched = $("#switched");
    const Status = $("#status");
    const UpdateDate = $("#updateDate");
    const Executed = $("#Executed");
    const Title = $("#Title-page");

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;
    let date = new Date();
    
    let rules = [
        {
            selector: "#name",
            guides: [Validation.required()]
        },
        {
            selector: "#author",
            guides: [Validation.required()]
        },
        {
            selector: "#Textarea",
            guides: [Validation.required()]
        }
    ];

    const app = (function() {
        let thumbnailOld = "";
        Code.value = (localStorage.getItem("CourseToken"))? localStorage.getItem("CourseToken") : "";
        if(type === "update") {
            let payload = {
                id: origin.parameter().token,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.unit)
            .then((result) => {
                if(result?.length) {
                    Author.value = result.at(0)?.Author;
                    CreateDate.value = result.at(0)?.CreateDate?.split(".")[0];
                    tinymce.activeEditor.setContent(result.at(0)?.Description);
                    Lesson.value = result.at(0)?.Lesson;
                    Name.value = result.at(0)?.Name;
                    Status.checked = result.at(0)?.Status;
                    UpdateDate.value = (result.at(0)?.UpdateDate)? result.at(0)?.UpdateDate.split(".")[0] : "";
                }
            })
            .catch((err) => {
                throw err;
            })
        }

        function getUnit() {
            let payload = {
                Author: Author.value,
                CreateDate: "",
                Description: Description.value,
                CourseId: Code.value,
                Lesson: 0,
                Name: Name.value,
                Status: true,
                UpdateDate: "",
            };

            if(type === "create") {
                payload.Type = "created";
                payload.CreateDate = date.toISOString();
            }

            if(type === "update") {
                payload.Type = "modified";
                payload.Id = origin.parameter().token;
                payload.UpdateDate = date.toISOString();

                delete payload.CreateDate;
                delete payload.Lesson;
                delete payload.Status;
            }

            return payload;
        }

        return  {
            BindInformationPage: function() {
                if(type === "update") {
                    Executed.innerHTML = "Cập nhật thông tin";
                    Switched.classList.add("active");
                    Title.innerHTML = "Thông tin khóa học";
                    
                } else {
                    Executed.innerHTML = "Thêm mới";
                    Switched.classList.remove("active");
                    Title.innerHTML = "Thêm mới Chương học";
                }
            },            
            BindEvent: function(callback) {
                if(type === "update") {
                    Status.addEventListener("change", callback().state);
                    Unit.addEventListener("submit", callback().update);

                } else {
                    Unit.addEventListener("submit", callback().create);
                }
            },
            Event: function() {
                return {
                    create : function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.POST(token, getUnit(), environment.endpoint.unit)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course/unit" : permission.setState(result);
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
                            https.PUT(token, getUnit(), environment.endpoint.unit)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course/unit" : permission.setState(result);
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
                            Id: origin.parameter().token,
                            Type: "modified"
                        };
                        
                        if(Number(Lesson.value)) {
                            permission.setState({type: "content-Linked"});

                        } else {
                            https.PUT(token, payload, environment.endpoint.unit)
                            .then((result) => {
                                (result?.status)? window.location.reload(): permission.setState(result);
                            })
                            .catch((err) => {
                                throw err;
                            })
                        }
                    }
                }
            },
            validation: function() {
                Validation({
                    form: "#unit",
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