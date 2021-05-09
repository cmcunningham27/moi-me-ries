const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { ToDo } = require('../../models');

//create new drop/todo. -not including a bucket id
router.post('/', withAuth, async (req, res) => {
    console.log('!!!!!!!!!!!!!!', req.session.user_id);
    try {
        const toDoData = await ToDo.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(toDoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all users todos for selected bucket. prob need more specificicty on route
//user only has one bucket. If user searches other users buckets maybe this is needed.
router.get('/', withAuth, async (req, res) => {
    try {
        const toDoData = await ToDo.findAll(); //do I need to add a where or will it know only toselect user
        if(!toDoData){
            res.status(404).json({ message: 'no drops here, make it rain'});
        }

        res.status(200).json(toDoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get single toDo from users bucket
router.get('/:id', async (req, res) => {
    try {
        const toDoData = await ToDo.findByPk(req.params.id);

        if(!toDoData){
            res.status(404).json({ message: 'cannot find drops you are looking for'});
        }

        res.status(200).json(toDoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update drop/todo
//cannot asign bucket_id w/ put
//bucket id should be same for each of users todo/dones
router.put('/:id', withAuth, async (req, res) => {
    try {
        const toDoData = await ToDo.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!toDoData){
            res.status(404).json({ message: 'cannot find the drop you are trying to update'});
        }

        res.status(200).json(toDoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete drop
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const toDoData = await ToDo.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!toDoData){
            res.status(404).json({ message: 'could not find drop you were looking for'});
        }

        res.status(200).json(toDoData);
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;