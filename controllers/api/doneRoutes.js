const { Done, ToDo } = require('../../models');
const withAuth = require('../../utils/auth');

const router = require('express').Router();
const fs = require('fs');


//get all splash/done probably need more specificity to make sure it is attatched to user and bucket
router.get('/', withAuth, async (req, res) => {
    try {
        //include the original todo/drop info? look hoe far i came?
        const doneData = await Done.findAll();

        if(!doneData){
            res.status(404).json({ message: 'No splashes here, make one' });
        }

        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one splash/done probably need more specificity see other get ^^^
router.get('/:id', withAuth, async (req, res) => {
    try {
        const doneData = await Done.findByPk(req.params.id);

        if(!doneData){
            res.status(404).json({ message: 'cannot fine splash you were looking for' });
        }

        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create splash/todo
router.post('/', withAuth, async (req, res) => {
    console.log('!!!!!splashRoute!!!', req.body);
    // console.log('!!! splash route !!!', req.files.splashPic);
    try {
        
        const doneData = await Done.create({
            ...req.body,
            user_id: req.session.user_id,
            // image: req.files.splashPic
        });


        // const noMoreToDo = await ToDo.destroy({
        //     where: {
        //         title: req.body.title
        //     }
        // });

        // if (!noMoreToDo) {
        //     res.status(404).json('No ToDo item found!');
        // }

        // res.status(200).json(noMoreToDo);
        res.status(200).json(doneData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//upload/stage photo for db
//note built in fn for the html form wants to 'get' this end point
router.post('/pics', async (req, res) => {
    console.log('!!!pics route out of try!!!!', req.files.splashPic);
    try {
        console.log('!!!pics route inside try!!!', req.files.splashPic);

        if(!req.files){
            res.status(400).json({ message: 'there was a problem with your photo'})
        }

        const splashPic = req.files.splashPic;
        //prob not best place for folder but only one that worked
        const uploadPath = __dirname + '/pre_db_photo/' + splashPic.name;

        splashPic.mv(uploadPath, (err) => {
            if(err) return res.status(500).json(err);
        });   
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//update splash/done
router.put('/:id', withAuth, async (req, res) => {
    try {
        const doneData = await Done.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!doneData){
            res.status(404).json({ message: 'cannot find the splash you were looking for' });
        }

        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete splash/done
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const doneData = await Done.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!doneData){
            res.status(404).json({ message: 'could not find splash you were looking for' });
        }

        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(500);
    }
});

module.exports = router;