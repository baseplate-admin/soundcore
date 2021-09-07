export const humanizeSeconds = (duration: number) => {
    // Hours, minutes and seconds
    let hrs = ~~(Math.round(duration) / 3600);
    let mins = ~~((Math.round(duration) % 3600) / 60);
    let secs = ~~Math.round(duration) % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
};
