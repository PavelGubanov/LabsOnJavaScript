//Лаба 1, задание 4 (на вычисление расстояния между заданными двумя датами)
//Губанов Павел - 2 курс, 9 группа
'use strict';

// запись даты в строку в формате: ДД.ММ.ГГГГ
function formatDate(date) {
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// ввод даты через prompt в формате: ДД.ММ.ГГГГ (возвращает заполенный объект Date)
function InputDate(str){
    let currentDate = new Date();
    let newDate = prompt(str, formatDate(currentDate));
    if (newDate == null){
        newDate = formatDate(currentDate);
    }
    newDate = newDate.split('.');
    return new Date(newDate[2], newDate[1] - 1, newDate[0]);
}

// печать расстояния между датами в соответствии с полученными количествами дней, недель и т.д.
function printDistUnits (days, weeks, months, years){
    let result = `Результат: `;
    let formatPrint = false;
    if ((years != undefined) || formatPrint){
        result += `${years} г. `;
        formatPrint = true;
    }
    if ((months != undefined) || formatPrint){
        result += `${months} мес. `;
        formatPrint = true;
    }
    if ((weeks != undefined) || formatPrint){
        result += `${weeks} нед. `;
        formatPrint = true;
    }
    if ((days != undefined) || formatPrint){
        result += `${days} дн. `;
        formatPrint = true;
    }
    alert(result);
}

// возвращает количество дней в году в зависимости от его високосности
function countDaysInYear(year){
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
        return 366;
    }
    else{
        return 365;
    }
}

// возвращает количество дней в заданном месяце и в заданном году
function countDaysInMonth(year, month){
    switch (month) {
        case 2:
            if (countDaysInYear(year) == 366)
                return 29;
            else
                return 28;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        default:
            return 31;
            break;
    }
}

// вычисление расстояния между указанными датами и вывод на экран в соответствующем формате
function printDistance(countYearsIsOk, date1, date2, distDays){

    let curYear = date1.getFullYear();
    let curMonth = date1.getMonth() + 1;

    let countYears = 0;
    while (distDays >= countDaysInYear(curYear)){
        distDays -= countDaysInYear(curYear);
        curYear++;
        countYears++;
    }

    let countMonths = 0;
    while (distDays >= countDaysInMonth(curYear, curMonth)){
        distDays -= countDaysInMonth(curYear, curMonth);
        curMonth = (curMonth % 12) + 1;
        countMonths++;
    }

    let countWeeks = 0;
    while (distDays >= 7){
        distDays -= 7;
        countWeeks++;
    }

    let countDays = distDays;

    if (countYearsIsOk){
        printDistUnits(countDays, countWeeks, countMonths, countYears);
    }
    else{
        printDistUnits(countDays, countWeeks, countYears * 12 + countMonths);
    }
}

// ввод двух дат (по умолчанию - текущая дата)
let firstDate = InputDate("Введите первую дату: ");
let secondDate = InputDate("Введите вторую дату: ");





if (firstDate.getTime() > secondDate.getTime()){
    secondDate = new Date();
}

// запрос вида единиц измерения, в которых необходимо вывести расстояние между датами
let distUnit = prompt("Введите единицы, в которых вы хотите получить " +
                              "результат: (годы, месяцы, недели или дни)", "дни");
// количество дней в указанном промежутке
let distDays = Math.trunc((secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));


// вывод результата в зависимости от заданных единиц для отображения
switch (distUnit) {
    case "годы": {
        printDistance(true, firstDate, secondDate, distDays);
        break;
    }
    case "месяцы": {
        printDistance(false, firstDate, secondDate, distDays);
        break;
    }
    case "недели": {
        printDistUnits(distDays % 7, Math.trunc(distDays / 7));
        break;
    }
    default: {
        printDistUnits(distDays);
        break;
    }
}