const firstN = (obj, n) => {
    return _.chain(obj)
        .keys()
        .sort()
        .take(n)
        .reduce(function (memo, current) {
            memo[current] = obj[current];
            return memo;
        }, {})
        .value();
}
const diff_arr = (arr1, arr2) => {
    return arr1.filter(a => !arr2.find(e => e.every((v, i) => v == a[i])))
}
