export const formatDateTime = (date: Date, time: string) => {
    const [timePart, meridiem] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (meridiem === 'PM' && hours !== 12) {
        hours += 12;
    }

    if (meridiem === 'AM' && hours === 12) {
        hours = 0;
    }

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hh = String(newDate.getHours()).padStart(2, '0');
    const mm = String(newDate.getMinutes()).padStart(2, '0');
    const ss = String(newDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
};