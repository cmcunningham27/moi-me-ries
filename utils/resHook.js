const resFinish = (req, res, next) => {
    res.on('finish', () => {
        console.log(res);
        // res.send(data);
        next();
    });
};

module.exports = resFinish;