import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin from "../lib/lib-origin.js";
import { Validation } from "../lib/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    const Lesson = $("#lesson");
    const code = $("#code");
    const Content = $("#Textarea");
    const CreateDate = $("#createDate");
    const UpdateDate = $("#updateDate");
    const Name = $("#name");
    const Status = $("#status");
    const Switched = $("#switched");
    const Executed = $("#Executed");
    const Title = $("#Title-page");

    let date = new Date();
    
    let rules = [
        {
            selector: "#name",
            guides: [Validation.required()]
        },
        {
            selector: "#Textarea",
            guides: [Validation.required()]
        }
    ];

    const app = (function() {
        if(type === "update") {
            let payload = {
                id: origin.parameter().token,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.lesson)
            .then((result) => {
                if(result?.length) {
                    Name.value = result.at(0)?.Name;
                    CreateDate.value = result.at(0)?.CreateDate?.split(".")[0];
                    UpdateDate.value = (result.at(0)?.UpdateDate)? result.at(0)?.UpdateDate.split(".")[0] : "";
                    tinymce.activeEditor.setContent(result.at(0)?.Content);
                    Status.checked = result.at(0)?.Status;
                }
            })
            .catch((err) => {
                throw err;
            })
        }

        function getCourse() {
            let payload = {
                Content: Content.value,
                CreateDate: date.toISOString(),
                Name: Name.value,
                Status: true,
                UnitId: code.value,
                UpdateDate: "",
            }

            if(type === "create") {
                payload.Type = "created";
                payload.Thumbnail = "";
            }

            if(type === "update") {
                payload.Type = "modified";
                payload.Id = origin.parameter().token;
                payload.UpdateDate = date.toISOString();

                delete payload.CreateDate;
                delete payload.Status;
            }

            return payload;
        }

        return  {
            BindInformationPage: function() {
                code.value = (localStorage.getItem("UnitToken"))? localStorage.getItem("UnitToken") : "" ;
                if(type === "update") {
                    Executed.innerHTML = "Cập nhật thông tin";
                    Switched.classList.add("active");
                    Title.innerHTML = "Chỉnh sửa thông tin";
                    
                } else {
                    Executed.innerHTML = "Thêm mới";
                    Switched.classList.remove("active");
                    Title.innerHTML = "Thêm mới bài học";

                }
            },            
            BindEvent: function(callback) {
                if(type === "update") {
                    Status.addEventListener("change", callback().state);
                    Lesson.addEventListener("submit", callback().update);

                } else {
                    Lesson.addEventListener("submit", callback().create);
                }
            },
            Event: function() {
                return {
                    create : function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.POST(token, getCourse(), environment.endpoint.lesson)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course/unit/lesson" : permission.setState(result);
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
                            https.PUT(token, getCourse(), environment.endpoint.lesson)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course/unit/lesson" : permission.setState(result);
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
                            Type: "modified",
                            UpdateDate: date.toISOString(),
                        };
                        
                        https.PUT(token, payload, environment.endpoint.lesson)
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
                Validation({
                    form: "#lesson",
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