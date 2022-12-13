const addOrRemove = async (arr, val) => {
    if (!_.includes(arr, val)) {
        arr.push(val);
    } else {
        _.remove(arr, item => item === val);
    }
    //  console.log(arr);
}

