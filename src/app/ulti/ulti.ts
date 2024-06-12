export function abbreviateNumber(num: number, digits = 1) {
    const suffixes = ['K', 'M', 'B', 'T'];
    const divisor = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));

    if (divisor === 0) return num;

    return (num / Math.pow(1000, divisor)).toFixed(digits) + suffixes[divisor - 1];
}

export function getTimeAgo(thenStr: string | Date): string {
    const now = new Date();
    const then = thenStr instanceof Date ? thenStr.getTime() : new Date(thenStr).getTime();
    const differenceInMilliseconds = now.getTime() - then;
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
        return `${years}年前`;
    } else if (months > 0) {
        return `${months}ヶ月前`;
    } else if (days > 0) {
        return `${days}日前`;
    } else if (hours > 0) {
        return `${hours}時間前`;
    } else if (minutes > 0) {
        return `${minutes}分前`;
    } else {
        return '1分未満前';
    }
}

export function getTimeOptions() {
    return Array.from({ length: 24 }, (_, hour) =>
        Array.from({ length: 4 }, (_, index) => {
            const minute = index * 15;
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        })
    ).flat();
}

export function getDateOptions() {
    const dates = [];
    const year = new Date().getFullYear();
    for (let month = new Date().getMonth(); month < 12; month++) {
        const lastDay = new Date(year, month + 1, 0).getDate();

        for (let day = new Date().getDate(); day <= lastDay; day++) {
            dates.push(new Date(year, month, day));
        }
    }
    return dates;
}

export function formatDate(inputDate?: string, format: string = 'YYYY/MM/DD') {
    if (!inputDate) {
        return '';
    }
    const date = new Date(inputDate);
    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const year = date.getFullYear() + '';
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるため+1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = days[date.getDay()];

    format = format.replace('YYYY', year);
    format = format.replace('MM', month);
    format = format.replace('DD', day);
    format = format.replace('HH', hours);
    format = format.replace('mm', minutes);
    format = format.replace('ss', seconds);
    format = format.replace('WD', weekday);

    return format;
}

export function numberWithCommas(number: number | undefined) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function objectToQueryParams<T extends Object>(obj: T) {
    const params = [];
    for (const [key, value] of Object.entries(obj)) {
        if (!value) continue;
        if (Array.isArray(value)) {
            for (const item of value) {
                params.push({ key, value: item });
            }
        } else {
            params.push({ key, value });
        }
    }
    const query = params.filter((q) => Boolean(q.value)).map((q) => `${q.key}=${q.value}`);
    return `${query.join('&')}`;
}

export function camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function renderHoursWithIntervals() {
    return Array.from({ length: 24 }, (_, hour) =>
        Array.from({ length: 4 }, (_, index) => {
            const minute = index * 15;
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        })
    ).flat();
}

export function convertObjectToQueryParams(obj: object) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
        if (!value) continue;
        if (Array.isArray(value)) {
            for (const item of value) {
                params.append(key, encodeURIComponent(item));
            }
        } else {
            params.set(key, encodeURIComponent(value));
        }
    }
    return params.toString();
}
