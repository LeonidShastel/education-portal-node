export const getDayInMonth = (year, month) => {
    return new Date(year , month, 0).getDate();
}

export const getWeekDay = (day, year=null, month=null, fullName=false) => {
    const days = !fullName ? [
        'вс',
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб'
    ] : ['Воскресенье', "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const date = new Date();
    const currentDay = new Date(year || date.getFullYear(), month || date.getMonth(), day);

    return days[currentDay.getDay()];
}
export const getMonth = (month) => {
    const months = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ]

    return months[month];
}

export const getMillisecondsForServer = (date) => {

}