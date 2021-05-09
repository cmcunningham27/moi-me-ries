const router = require('express').Router();
const { User, Bucket, ToDo, Done } = require('../../models');
const withAuth = require('../../utils/auth');


//user only has one bucket
//keep for general searches/browsing?

//todo + done = bucketData
router.get('/', withAuth, async (req, res) => {
    try {
        console.log('get bucket', req.session);
        // const bucketData = await ToDo.findAll({
        const bucketData = await ToDo.findAll({
            where: {
                //user_id is prop of bucket model req.session.user_id is the current users id
                user_id: req.session.user_id
            },
            // include: [{ model: Done }]
            include: [{ model: Done }]
        });

        if(!bucketData){
            res.status(404).json({ message: 'There is nothing in your bucket.' });
        }

        res.status(200).json(bucketData);
        // res.render('bucket');
    } catch (err) {
        console.log('bucket route', err);
        res.status(500).json(err);
    }
});



//gets single bucket
//for searches of other users bucket?
router.get('/:id', withAuth, async (req, res) => {
    try {
        const bucketData = await Bucket.findByPk(req.params.id/*, {
            include: [{ model: 'Todo' }, { model: 'Done' }]
        }*/);

        if(!bucketData){
            res.status(404).json({ message: 'bucket not found' });
        //need to figure out what this page is actually called
        // res.render('bucket');
        }

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(err).json(err);
    }
});


module.exports = router;