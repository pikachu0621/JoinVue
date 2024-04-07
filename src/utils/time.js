

export function getLastDates(listMax = 7) {
    const dates = [];
    for (let i = listMax - 1; i >= 0; i--) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - i);
        const formattedDate = formatDate(dateObj);
        dates.push(formattedDate);
    }
    return dates;
}
function formatDate(dateObj) {
    // const year = dateObj.getFullYear();
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());
    return /*${year}-*/`${month}-${day}`;
}

// 辅助函数，在月份或日期小于10时添加前导零
function addLeadingZero(num) {
    if (num < 10) num = '0' + num;
    return num;
}


export function randomNumber(numMin = 0, numMax = 100, listMax = 7){
    const dates = []
    for (let i = 0; i < listMax; i++) {
        dates.push(getRandomFloat(numMin, numMax))
    }
    return dates
}

export function getRandomFloat(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
