import { router } from "./router.js";
export const pathToRegex = (path) =>
    new RegExp(
        "^" +
        path
        .replace(/\//g, "\\/")
        .replace(/-\w+/g, "([A-Za-z][A-Za-z0-9]+)")
        .replace(/@\w+/g, "@([A-Za-z0-9]+)") +
        "$"
    );

export const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/(?:-|@)(\w+)/g)).map(
        (result) => result[1]
    );
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
};

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

// export const navigateTo2 = (state, url) => {
//   history.pushState(state, null, url);
//   router();
// };

export const formatDateForChat = (date) => {

    let messageDate = new Date(date)
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let day = formatToDoubleDigit(messageDate.getDate());
    let month = months[messageDate.getMonth()];
    let hour = formatToDoubleDigit(messageDate.getHours());
    let minute = formatToDoubleDigit(messageDate.getUTCMinutes());
    let formatted_date = day + "-" + month + " " + hour + ":" + minute;
    return formatted_date;
}

const formatToDoubleDigit = (value) => {
    if (value <= 9) {
        value = '0' + value;
    }
    return value;
}