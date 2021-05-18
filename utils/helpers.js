module.exports = {
    limitSplashes: (arr, max) => {
        const done = [];

        for (let i = 0; i < max && i < arr.length; i++) {
            if(arr[i].isDone){
                done.unshift(arr[i]);
            }
        }
        return done;
    },
    // parseImage: (img) => {
    //     let blob = new buffer.Blob([img], {type: 'image/png'});
    //     return URL.createObjectURL(blob);
    // }

};