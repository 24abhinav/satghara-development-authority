export const getIstTime = utc => {
    const date = new Date(new Date(utc).getTime());
    return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
};