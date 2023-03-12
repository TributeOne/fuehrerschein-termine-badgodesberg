export const timeStamp = () => {
    const dateNow = new Date()
    const dateNowTime = String(giveNumberAZero(dateNow.getHours()) + ":" + giveNumberAZero(dateNow.getMinutes()) + ":" + giveNumberAZero(dateNow.getSeconds()))
    return dateNowTime
}

export const giveNumberAZero = (number: number) => {
    if ( String(number).length == 1) {
        return ("0" + number)
    }
    else if (String(number).length == 0) {
        return ("00")
    }
    else {
        return String(number)
    }
}