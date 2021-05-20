const router = require('express').Router();
const { User, ListItem, ToDo, Done } = require('../../models');
const withAuth = require('../../utils/auth');

//pre sign in/login intro page
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//directs user to their bucket page and passes along all of their user list-item data
router.get('/bucket', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: { model: ListItem},
            attributes: {exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        user.image = 'data:image/jpeg;base64, ' + user.image.toString('base64');
        user.list_items.forEach((userItems) => {
            //iterating over users listItem array and replacing the buffer on the image property with toString of buffer
            if(userItems.image) {
                userItems.image = 'data:image/jpeg;base64, ' + userItems.image.toString('base64');
            }
        }) ;


        res.render('bucket', {
            user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
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