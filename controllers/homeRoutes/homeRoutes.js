const router = require('express').Router();
const { User, ToDo, Done } = require('../../models');
const withAuth = require('../../utils/auth');

//pre signin/login intro page
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//directs user to their bucket page and passes along all of their user data (todo/drops, done/splashes and user info)
router.get('/bucket', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },

            include: [{ model: ToDo, attributes: ['title', 'id', 'user_id'] },
                { model: Done, attributes: ['title', 'content','id','image'] }],
        });

        const user = userData.get({ plain: true });

        res.render('bucket', {
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//routes user to login page
router.get('/login', (req, res) => {
    try {

        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;