export function renderCommonBody(data) {
    let template = data.reduce((accument, curent) => {
        let keys = Object.keys(curent);
        return accument.concat("<tr>" +
            keys.reduce((reAccument, reCurrent) => {
                return reAccument.concat(`<td>${curent[reCurrent]}</td>`);
            }, []).join("") + "</tr>"
        );
    }, []).join("");
    return template;
}

export function renderCommonHeader() {

}