const { Done, ToDo } = require('../../models');
const withAuth = require('../../utils/auth');
const path = require('path');

const router = require('express').Router();

//create done/splash
router.post('/', withAuth, async (req, res) => {
    try {
        const doneData = await Done.create({
            ...req.body,
            image: req.body.image,
            user_id: req.session.user_id,
        });
        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//uploads photo to server
router.post('/pics', async (req, res) => {
    try {

        if(!req.files){
            res.status(400).json({ message: 'there was a problem with your photo'})
        }

        const splashPic = req.files.splashPic;
        const uploadPath = __dirname + '/../../public/images/pre_db/' + splashPic.name;

        splashPic.mv(uploadPath, (err) => {
            if(err) return res.status(500).json(err);
        });   
    } catch (err) {
        res.status(500).json(err);
    }
});

//update splash/done
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const doneData = await Done.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });

//         if(!doneData){
//             res.status(404).json({ message: 'cannot find the splash you were looking for' });
//         }

//         res.status(200).json(doneData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//delete splash/done
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const doneData = await Done.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });

//         if(!doneData){
//             res.status(404).json({ message: 'could not find splash you were looking for' });
//         }

//         res.status(200).json(doneData);
//     } catch (err) {
//         res.status(500).json(500);
//     }
// });

module.exports = router;