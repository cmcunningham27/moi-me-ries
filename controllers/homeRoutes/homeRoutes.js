const router = require('express').Router();
const { User, ToDo, Done } = require('../../models');
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

//renders users bucket info ie todos dones
// router.get('/bucket', withAuth, async (req, res) => {
//     try {
//         const bucketData = await Bucket.findAll({
//             // where: {
//             //     //user_id is prop of bucket model req.session.user_id is the current users id
//             //     user_id: req.sessions.user_id
//             // },
//             include: [
//                 {
//                     model: Todo,
//                     attribute: ['title'],
//                 },
//                 {
//                     model: Done,
//                     attribute: ['title'],
//                 }]
//         });

//         if(!bucketData){
//             res.status(404).json({ message: 'No one has signed up' });
//         }

//         const buckets = bucketData.map((bucket) => bucket.get({ plain: true }));

//         res.render('bucket', {
//             buckets,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });



router.get('/bucket', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: ToDo, attributes: ['title', 'id', 'user_id'] }, { model: Done, attributes: ['title'] }],
        });

        const user = userData.get({ plain: true });

        console.log(user);

        res.render('bucket', {
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/splash', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: ToDo, attributes: ['title', 'id'] }, { model: Done, attributes: ['title'] }],
        });

        const user = userData.get({ plain: true });

        res.render('newsplash', {
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/splash', withAuth, async (req, res) => {
//     try {
//         const splashData = await Done.findOne({
//             where: {
//                 title: req.body
//             }
//         });

//         const splash = splashData.get({ plain: true });

//         res.render('newsplash', {
//             splash,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
    try {
        // if(req.session.logged_in){
    //     res.redirect('/profile');
    //     return;
        // }

        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;