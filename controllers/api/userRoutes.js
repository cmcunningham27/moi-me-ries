const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async(req, res) => {
    console.log('hello', req);
    try {
        const userData = await User.findAll();

        if(!userData){
            res.json({ message: 'no users to find' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if(!userData){
            res.status(404).json({ message: 'user not found' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(userData);
    }
});

//route for new users to sign up. creates a new user in database.
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//updates user
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!userData){
            res.status(404).json({ message: 'cannot find user' });
        }

        res.status(200).json(err);

    } catch (err) {

        res.status(500).json(err);
    }
});

//user login
router.post('/login', async (req, res) => {
    console.log('before try');
    try {
        console.log('after try');
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
        });

        if(!userData){
            res.status(400).json({ message: 'login failed: email or password incorrect.'});
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'login failed: email or password incorrect.'});
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ message: 'log in successful'});
        });

    } catch (err) {
        console.log('catch');
        res.status(500).json(err);
    }
});

//delete user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!userData){
            res.status(404).json(err);
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//user logout
router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;