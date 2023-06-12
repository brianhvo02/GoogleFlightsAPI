export const getTime = (isoStr: string) => new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', 'minute': '2-digit' });
export const checkCode = (code: string) => code.match(/^[A-Z]{3}$/);

export const checkDepArrDates = (depDate: string, arrDate: string) => {
    if (!depDate.match(/^\d{4}-\d{2}-\d{2}$/) || !arrDate.match(/^\d{4}-\d{2}-\d{2}$/))
		throw new Error('Check in or check out date not formatted correctly (YYYY-MM-DD)');

    const currentDate = new Date();
    const checkIn = new Date(depDate + ' ');
    const checkOut = new Date(arrDate + ' ');

    if (checkIn < currentDate || checkOut < currentDate)
        throw new Error('Check in or check out date not after current date');

    if (checkIn > checkOut)
        throw new Error('Check in date after check out date');

    return { currentDate, checkIn, checkOut }
}