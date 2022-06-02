export default class DateTimes {
    constructor() { }

    bindingToTemplate(result) {
        let date = new Date(result);
        date = date.toLocaleString().split(",")[0].split("/");
        let day = (date[1].length < 2)? `0${date[1]}` : date[1];
        let month = (date[0].length < 2)? `0${date[0]}` : date[0];
        let year = date[2];
        return `${year}-${month}-${day}`;
    }
}