
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getByEmail,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find().toArray();
        users.forEach(user => {
            delete user.password;
            delete user.email
        });
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log('ERROR: cannot find user')
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log('ERROR: cannot update user')
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log('ERROR: cannot insert user')
        throw err;
    }
}