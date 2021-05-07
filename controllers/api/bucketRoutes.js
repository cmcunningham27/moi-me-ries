const router = require('express').Router();
const { Bucket } = require('../../models');
const withAuth = require('../../utils/auth');


//creates new bucket in db
router.post('/', async (req, res) => {
    try {
        //need to add req.session.user_id
        const bucketData = await Bucket.create(req.body);

        if(!bucketData){
            res.status(404).json({ message: 'Cannot find that bucket id' });
        }

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all users buckets
router.get('/', async (req, res) => {
    try {
        const bucketData = await Bucket.findAll(/*{
            where: {
                //user_id is prop of bucket model req.session.user_id is the current users id
                user_id: req.sessions.user_id
            },
            include: [{ model: 'Todo' }, { model: 'Done' }]
        }*/);

        if(!bucketData){
            res.status(404).json({message: 'No buckets in storage'});
        }

        res.json(bucketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//gets single bucket
router.get('/:id', async (req, res) => {
    try {
        const bucketData = await Bucket.findByPk(req.params.id/*, {
            include: [{ model: 'Todo' }, { model: 'Done' }]
        }*/);

        if(!bucketData){
            res.status(404).json({ message: 'bucket not found'});
        //need to figure out what this page is actually called
        // res.render('buckets');
        }

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(err).json(err);
    }
});

//update bucket
router.put('/:id', withAuth, async (req, res) => {
    try {
        const bucketData = await Bucket.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!bucketData){
            res.status(404).json({ message: 'cannot find bucket'});
        }

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete bucket
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const bucketData = await Bucket.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!bucketData){
            res.status(404).json({ message: 'cannot find bucket'});
        }

        res.status(200).json(bucketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;