const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const bucketData = await findAll({
            include: [{ model: 'ToDo'}, {model: 'Done'}],
            where: {
                bucket_id: req.session.user_id
            }
        });

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;