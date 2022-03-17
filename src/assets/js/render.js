export function renderCommonBody(data, hideProperty) {
    let template = data.reduce((accument, curent) => {
        let keys = Object.keys(curent);
        // let team = keys.map((e) => {
        //     let test = null;
        //     hideProperty.forEach((E) => {
        //         if (e != E) {
        //             test = e;
        //         }
        //     })
        //     return test;
        // })
        // console.log(team);
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