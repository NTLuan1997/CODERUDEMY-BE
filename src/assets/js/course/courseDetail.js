import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin  from "../lib/lib-origin.js";
import { Priture } from "../lib/priture.js";
import { Validation } from "../lib/validation.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const priture = new Priture();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;

    // GET WRAPPER
    const Course = $("#Course");
    const Name = $("#Name");
    const Type = $("#Type");
    const Author = $("#Author");
    const CreateDate = $("#CreateDate");
    const UpdateDate = $("#UpdateDate");
    const Unit = $("#Unit");
    const Description = $("#Description");
    let date = new Date();
    let ThumbnailOld = "";

    // HIDDEN INPUT
    const Switched = $("#switched");
    const Status = $("#Status");
    const hiddenGroup = $$(".hidden-group");

    // PRITURE
    const pageThumbnail = $("#page-thumbnail");
    const Thumbnail = $("#thumbnail");
    const ContentThumbnail = $("#content-thumbnail");
    const BlankThumbnail = $("#blank-thumbnail");

    const rules = [
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
            selector: "#Description",
            guides: [Validation.required()]
        }
    ];

    if(type === "update") {
        pageThumbnail.classList.add("active");
        Switched.classList.add("active");
        hiddenGroup.forEach((group) => {
            group.classList.add("active");
        })

        rules.concat([
            {
                selector: "#CreateDate",
                guides: [Validation.required()]
            },
            {
                selector: "#EditDate",
                guides: [Validation.required()]
            },
            {
                selector: "#Thumbnail",
                guides: [Validation.required()]
            }
        ]);

        (function() {
            environment.payload.type = "Find";
            environment.payload.id = origin.parameter().token;

            https.FIND(environment.payload, token, environment.endpoint.course)
            .then((result) => {
                if(result?.length) {
                    binding(result[0]);
                }
            })
            .catch((err) => {
                throw err;
            })

        }())
    }

    Validation({
        form: "#Course",
        selectorError: ".form-message",
        rules: rules
    });

    switch (type) {
        case "update":
            setTitleForm("update");
            Status.addEventListener("change", uploadStatus);
            Thumbnail.addEventListener("change", uploadThumbnail);
            Course.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Course.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        if (this.valid) {
            https.POST(token, setValue(), environment.endpoint.course)
            .then((result) => {
                if(result?.status) {
                    window.location.href = "/web/course";
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    function update(e) {
        e.preventDefault();
        if (this.valid) {
            https.PUT(token, setValue(), environment.endpoint.course)
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

    function uploadStatus(e) {
        let payload = {
            Id: origin.parameter().token,
            Func: "Status",
            Status: this.checked
        }

        return https.PUT(token, payload, environment.endpoint.course)
        .then((result) => {
            if(result?.status) {
                window.location.reload();
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    function uploadThumbnail(e) {
        priture.upload(environment.priture.url, this.files[0], "courses", ThumbnailOld)
        .then((result) => {
            let {status, message, destination} = result;
            if(status) {
                let payload = {
                    Id: origin.parameter().token,
                    Type: "Thumbnail",
                    Destination: destination,
                    UpdateDate: date.toISOString()
                }
                return https.PUT(token, payload, environment.endpoint.course);
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

    function binding(result) {
        Name.value = result?.Name;
        Author.value = result?.Author;
        Type.value = result?.Type;
        Unit.value = result?.Unit;
        CreateDate.value = result?.CreateDate.split(".")[0];
        UpdateDate.value = (result?.UpdateDate)? result?.UpdateDate.split(".")[0] : "";
        Description.value = result?.Description;
        Status.checked = result?.Status;
        if(result?.Thumbnail) {
            ThumbnailOld = result?.Thumbnail;
            ContentThumbnail.lastElementChild.setAttribute("src", `${environment.priture.url}/${ThumbnailOld}`);
            ContentThumbnail.style.display = "block";
            BlankThumbnail.style.display = "none";

        } else {
            ContentThumbnail.style.display = "none";
            BlankThumbnail.style.display = "block";
        }
    }

    function setValue() {
        let payload = {
            Author: Author.value,
            Description: Description.value,
            Name: Name.value,
            Status: false,
            Type: Type.value,
        }

        if(type === "create") {
            payload.CreateDate = date.toISOString();
            payload.Func = "CreateCourse";
            payload.Unit = 0;
            payload.UpdateDate = "";
            payload.Thumbnail = "";
        }

        if(type === "update") {
            payload.Func = "Edit";
            payload.Id = origin.parameter().token;
            payload.Unit = Unit.value;
            payload.UpdateDate = date.toISOString();
        }
        
        return payload;
    }

    function setTitleForm(type) {
        let title = $$(".information-title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới khóa học";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Thông tin khóa học";
            subButton.innerHTML = "Cập nhật";
        }
    }
}