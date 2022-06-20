import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import Origin from "../lib/lib-origin.js";
import { Permission } from "../lib/permission.js";
import { Validation } from "../lib/validation.js";

window.onload = function () {

    const cookie = new Cookie();
    const date = new Date();
    const https = new HTTPS();
    const origin = new Origin();
    const permission = new Permission();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const Unit = $("#Unit");
    const Author = $("#Author");
    const Code = $("#Code");
    const Description = $("#Description");
    const Name = $("#Name");
    const Lesson = $("#Lesson");
    const CreateDate = $("#CreateDate");
    const UpdateDate = $("#UpdateDate");

    // COMMONT
    const token = `Bearer ${cookie.get("Authentic")}`;
    const type = origin.parameter().type;
    let unitId = "";

    // STATUS
    const switched = $("#switched");
    const Status = $("#Status");

    (function() {
        if(localStorage.getItem("CourseToken")) {
            Code.value = localStorage.getItem("CourseToken");
        }

        if(type === "update") {
            switched.classList.add("active");
            unitId = origin.parameter().token;

            let payload = {
                id: unitId,
                type: "Find"
            }

            https.FIND(payload, token, environment.endpoint.unit)
            .then((result) => {
                binding(result.at(0));
            })
            .catch((err) => {
                throw err;
            })
        }
    }())

    switch (type) {
        case "update":
            setTitleForm("update");
            Status.addEventListener("change", state);
            Unit.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Unit.addEventListener("submit", create);
            break;
    }

    function create(e) {
        e.preventDefault();
        https.POST(token, setValue(), environment.endpoint.unit)
        .then((result) => {
            (result?.status)? window.location.href = "/web/course/unit" : permission.setState(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    function update(e) {
        e.preventDefault();
        https.PUT(token, setValue(), environment.endpoint.unit)
        .then((result) => {
            (result?.status)? window.location.href = "/web/course/unit" : permission.setState(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    function state(e) {
        e.preventDefault();
        let payload = {
            Type: "modified",
            Id: unitId,
            Status: this.checked,
            UpdateDate: date.toISOString(),
        }
        https.PUT(token, payload, environment.endpoint.unit)
        .then((result) => {
            (result?.status)? window.location.href = "/web/course/unit" : permission.setState(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    function binding(result) {
        Author.value = result?.Author;
        CreateDate.value = result?.CreateDate.split(".")[0];
        Description.value = result?.Description;
        Lesson.value = result?.Lesson;
        Name.value = result?.Name;
        Status.checked = result?.Status;
        UpdateDate.value = result?.UpdateDate.split(".")[0];
    }

    function setValue() {
        let payload = {
            Author: Author.value,
            CreateDate: "",
            Description: Description.value,
            CourseId: localStorage.getItem("CourseToken"),
            Lesson: 0,
            Name: Name.value,
            Status: true,
            UpdateDate: "",
        };

        if(type === "create") {
            payload.Type = "createUnit";
            payload.CreateDate = date.toISOString();
        }

        if(type === "update") {
            payload.Type = "modified";
            payload.Id = unitId;
            payload.UpdateDate = date.toISOString();
            delete payload.CreateDate;
            delete payload.Lesson;
            delete payload.Status;
        }

        return payload;
    }

    function setTitleForm(type) {
        let title = $$(".information-title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới Chương học";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật";
        }
    }
}