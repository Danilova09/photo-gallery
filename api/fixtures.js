const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Photo = require("./models/Photo");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [USER, ADMIN] = await User.create({
        avatar: null,
        displayName: 'user',
        email: 'user@gmail.com',
        password: 'user',
        token: 'user',
        role: 'user',
    }, {
        avatar: null,
        displayName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        token: 'admin',
        role: 'admin'
    });

    await Photo.create({
        user: USER,
        title: 'Mountains',
        image: 'mountains.jpg',
    }, {
        user: USER,
        title: 'Nature',
        image: 'nature.jpg',
    }, {
        user: USER,
        title: 'Memories',
        image: 'memories.jpg',
    }, {
        user: USER,
        title: 'Sunset',
        image: 'sunset.jpg',
    }, {
        user: ADMIN,
        title: 'Sea',
        image: 'sea.jpg',
    }, {
        user: ADMIN,
        title: 'Lake',
        image: 'lake.jpg',
    }, {
        user: ADMIN,
        title: 'Forest',
        image: 'forest.jpg',
    }, {
        user: ADMIN,
        title: 'Weekend',
        image: 'weekend.jpg',
    })

    await mongoose.connection.close();
}


run().catch(e => console.log(e));