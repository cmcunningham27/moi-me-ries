const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { ToDo } = require('../../models');

//create todo/drop
router.post('/', withAuth, async (req, res) => {
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

// //get single toDo from users bucket
// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const toDoData = await ToDo.findByPk(req.params.id);

//         if(!toDoData){
//             res.status(404).json({ message: 'cannot find drops you are looking for'});
//         }

//         res.status(200).json(toDoData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//updates todo/drop
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const toDoData = await ToDo.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });

//         if(!toDoData){
//             res.status(404).json({ message: 'cannot find the drop you are trying to update'});
//         }

//         res.status(200).json(toDoData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//deletes todo/drop
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
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;