const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//route for new users to sign up. creates a new user in database.
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// adds profile pic to user
router.post('/pic/:id', withAuth, async (req, res) => {
    try {

        if(!req.files){
            res.status(400).json({ message: 'there was a problem with your photo' });
        }

        profPic = req.files.profPic.data;

        const userData = await User.update({
            image: profPic
        },
        {
            where: {
                id: req.params.id
            }
        });

        // if(!userData){
        //     res.status(404).json({ message: 'cannot find user' });
        // }

        // res.status(200).json(err);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
        });

        if(!userData){
            return res.status(400).json({ message: 'login failed: email or password incorrect.'});
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword){
            return res.status(400).json({ message: 'login failed: email or password incorrect.'});

        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            return res.redirect('/bucket');
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//delete user
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const userData = await User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });

//         if(!userData){
//             res.status(404).json(err);
//         }

//         res.status(200).json(userData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//user logout
router.post('/logout', withAuth, (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;