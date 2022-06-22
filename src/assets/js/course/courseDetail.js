import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin  from "../lib/lib-origin.js";
import { Permission } from "../lib/permission.js";
import { Priture } from "../lib/priture.js";
import { Validation } from "../lib/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const permission = new Permission();
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // INFORMATION
    const Course = $("#Course");
    const Name = $("#Name");
    const Type = $("#Type");
    const Author = $("#Author");
    const CreateDate = $("#CreateDate");
    const UpdateDate = $("#UpdateDate");
    const Unit = $("#Unit");
    const Description = $("#Textarea");
    const Swicthed = $("#Switched");
    const Status = $("#Status");
    const Executed = $("#Executed");
    const Title = $("#Title-page");
    const Thumbnail = $("#Thumbnail");
    const Upload = $("#Upload");

    const BlankContent = $$(".blank-content")[0];
    const Hidden = $$(".hidden");
    const ImageContent = $$(".image-content")[0];

    let date = new Date();
    
    let rules = [
        {
            selector: "#Name",
            guides: [Validation.required()]
        },
        {
            selector: "#Type",
            guides: [Validation.required()]
        },
        {
            selector: "#Author",
            guides: [Validation.required()]
        },
        {
            selector: "#Textarea",
            guides: [Validation.required()]
        }
    ];

    const app = (function() {
        let thumbnailOld = "";
        if(type === "update") {
            let payload = {
                id: origin.parameter().token,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.course)
            .then((result) => {
                if(result?.length) {
                    Name.value = result.at(0)?.Name;
                    Type.value = result.at(0)?.Type;
                    Author.value = result.at(0)?.Author;
                    CreateDate.value = result.at(0)?.CreateDate?.split(".")[0];
                    UpdateDate.value = (result.at(0)?.UpdateDate)? result.at(0)?.UpdateDate.split(".")[0] : "";
                    tinymce.activeEditor.setContent(result.at(0)?.Description);
                    Status.checked = result.at(0)?.Status;
                    Unit.value = result.at(0)?.Unit;
                    if(result.at(0)?.Thumbnail) {
                        ImageContent.classList.add("active");
                        thumbnailOld = result.at(0)?.Thumbnail;
                        Thumbnail.setAttribute("src", `${environment.priture.url}/${result.at(0)?.Thumbnail}`);

                    } else {
                        BlankContent.classList.add("active");
                    }
                }
            })
            .catch((err) => {
                throw err;
            })
        }

        function getCourse() {
            let payload = {
                Author: Author.value,
                Description: Description.value,
                Name: Name.value,
                Status: true,
                Type: Type.value,
            }

            if(type === "create") {
                payload.CreateDate = date.toISOString();
                payload.Func = "create";
                payload.Unit = 0;
                payload.UpdateDate = "";
                payload.Thumbnail = "";
            }

            if(type === "update") {
                payload.Func = "modified";
                payload.Id = origin.parameter().token;
                payload.Unit = Unit.value;
                payload.UpdateDate = date.toISOString();
                delete payload.Status;
            }
            
            return payload;
        }

        return  {
            BindInformationPage: function() {
                if(type === "update") {
                    Executed.innerHTML = "Cập nhật thông tin";
                    Swicthed.classList.add("active");
                    Title.innerHTML = "Thông tin khóa học";

                    Hidden.forEach((item) => {
                        item.classList.add("active");
                    })
                    
                } else {
                    Executed.innerHTML = "Thêm mới";
                    Swicthed.classList.remove("active");
                    Title.innerHTML = "Thêm mới khóa học";

                }
            },            
            BindEvent: function(callback) {
                if(type === "update") {
                    Status.addEventListener("change", callback().state);
                    Upload.addEventListener("change", callback().thumbnail);
                    Course.addEventListener("submit", callback().update);

                } else {
                    Course.addEventListener("submit", callback().create);
                }
            },
            Event: function() {
                return {
                    create : function(e) {
                        e.preventDefault();
                        if (this.valid) {
                            https.POST(token, getCourse(), environment.endpoint.course)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course" : permission.setState(result);
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
                            https.PUT(token, getCourse(), environment.endpoint.course)
                            .then((result) => {
                                (result?.status)? window.location.href = "/web/course" : permission.setState(result);
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
                            Func: "modified"
                        };
                        
                        if(Number(Unit.value)) {
                            permission.setState({type: "content-Linked"});

                        } else {
                            https.PUT(token, payload, environment.endpoint.course)
                            .then((result) => {
                                (result?.status)? window.location.reload(): permission.setState(result);
                            })
                            .catch((err) => {
                                throw err;
                            })
                        }
                    },
                    thumbnail: function(e) {
                        priture.upload(environment.priture.url, this.files[0], "courses", thumbnailOld)
                        .then((result) => {
                            let {status, message, destination} = result;
                            if(status) {
                                let payload = {
                                        Id: origin.parameter().token,
                                        Func: "modified",
                                        Thumbnail: destination,
                                        UpdateDate: date.toISOString()
                                }
                                console.log("payload", payload);
                                return https.PUT(token, payload, environment.endpoint.course);
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
                Validation({
                    form: "#Course",
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