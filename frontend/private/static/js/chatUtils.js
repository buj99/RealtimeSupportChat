//Displays the date in the format DD-MM HH:MM




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