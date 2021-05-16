module.exports = {
    limitSplashes: (arr, max) => {
        const done = [];

        for (let i = 0; i < max && i < arr.length; i++) {
            done.push(arr[i]);
        }
        return done;
    }
};