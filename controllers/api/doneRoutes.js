const { Done } = require('../../models');

const router = require('express').Router();


//get all splash/done probably need more specificity to make sure it is attatched to user and bucket
router.get('/', async (req, res) => {
    try {
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
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
    try {
        const doneData = await Done.create(req.body);

        res.status(200).json(doneData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update splash/todo
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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