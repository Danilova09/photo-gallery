const express = require('express');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');
const config = require('../config');
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.photosUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        if (req.query.user) {
            const usersPhotos = await Photo.find({user: req.query.user}).populate('user');
            return res.send(usersPhotos);
        }
        const photos = await Photo.find().populate('user');
        return res.send(photos);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send({error: 'Image is required'});
        }
        const photoData = {
            user: req.body.user,
            title: req.body.title,
            image: req.file.filename,
        }
        const photo = new Photo(photoData);
        await photo.save();
        return res.send(photo);
    } catch (e) {
        next(e);
    }
});


router.delete('/:id', auth, async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id).populate('user');
        const usersPhotosId = photo.user._id;
        if (req.user._id.toString() === usersPhotosId.toString()) {
            photo.deleteOne();
            return res.send({message: 'Photo deleted!'});
        }

        return res.send({error: 'Not allowed!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;