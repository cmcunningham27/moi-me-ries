const router = require('express').Router();

const { ListItem } = require('../../models');
const { findByPk } = require('../../models/User');
const withAuth = require('../../utils/auth');
// const path = require('path');

//creates list item with only the title
router.post('/', withAuth, async (req, res) => {
    try {
        const listItemData = await ListItem.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(listItemData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//sends item info for big splash
router.get('/:id', withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const listItemData = await ListItem.findByPk(req.params.id);
        const listItem = listItemData.get({ plain: true })
        listItem.image = 'data:image/jpeg;base64, ' + listItem.image.toString('base64')
        // console.log(listItem, 'line 26');
        res.status(200).json(listItem);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

//updates list item with photo
router.post('/pics/:id', async (req, res) => {
    try {

        if(!req.files){
            res.status(400).json({ message: 'there was a problem with your photo'})
        }

        // const splashPic = new Blob([req.files.splashPic], {type: 'image/jpeg'});
        // console.log(req.files.splashPic.data.toString('base64'), '!!!splashPic!!!!');
        const splashPic = req.files.splashPic.data;
        // console.log(splashPic, '!!!splashPic!!!!');
        const listItemData = ListItem.update({
            image: splashPic,
        },
        {
            where: {
                id: req.params.id,
            },
        })
          
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update list item with content
router.put('/:id', withAuth, async (req, res) => {
    try {
        const listItemData = await ListItem.update({
            ...req.body,
            isDone: true,
            },
            {
                where: {
                    id: req.params.id
                },
            });

        if(!listItemData){
            res.status(404).json({ message: 'cannot find the splash you were looking for' });
        }
        res.status(200).json(listItemData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//delete list item
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const toDoData = await ListItem.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!toDoData){
            res.status(404).json({ message: 'could not find drop you were looking for'});
        }

        res.status(200).json(toDoData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;