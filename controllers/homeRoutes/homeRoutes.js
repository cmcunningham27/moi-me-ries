const router = require('express').Router();
const { User, Bucket } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all users buckets
router.get('/buckets', async (req, res) => {
    try {
        const bucketData = await Bucket.findAll(/*{
            where: {
                //user_id is prop of bucket model req.session.user_id is the current users id
                user_id: req.sessions.user_id
            },
            include: [{ model: 'Todo' }, { model: 'Done' }]
        }*/);

        if(!bucketData){
            res.status(404).json({ message: 'No buckets in storage' });
        }

        res.render('bucket');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//still needs a profile handlebar to go to
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Bucket }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if(req.session.logged_in){
    //     res.redirect('/profile');
    //     return;
    // }

    //redirect so we only have the one log in route/page
    // res.redirect('/api/users/login');
    res.render('login');
});

module.exports = router;