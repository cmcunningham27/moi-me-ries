const router = require('express').Router();
const { User, Bucket } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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
    if(req.session.logged_in){
        res.redirect('/profile');
    }

    // res.render('login');
});

module.exports = router;