const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const User = require('../models/User');
const mongoose = require("mongoose");
const config = require('../config');
const axios = require("axios");
const router = express.Router();
const download = require('image-downloader');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.avatarsUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next(e);
    }
})

router.post('/', upload.single('avatar'), async (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
        }

        if (req.file) {
            userData.avatar = req.file.filename;
        } else {
            userData.avatar = null;
        }

        const user = new User(userData);
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

router.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({error: 'Email not found'});
        }
        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong'});
        }
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});
        if (!user) return res.send({error: 'Token not found'});
        user.generateToken();
        await user.save();

        res.send({message: 'Logged out'});
    } catch (e) {
        next(e);
    }
});

router.post('/facebookLogin', async (req, res, next) => {
    try {
        const inputToken = req.body.authToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong User ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        const filename = nanoid() + '.jpeg';
        const usersAvatarUrl = req.body.response.picture.data.url;
        const options = {url: usersAvatarUrl, dest: config.avatarsUploadPath + '/' + filename};

        await download.image(options);

        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: filename,
            });
        }

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        next(e);
    }
})

module.exports = router;
