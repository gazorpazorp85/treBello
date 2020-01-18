const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

const logger = require('../../services/logger.service')

async function query() {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board');

    try {
        const boards = await collection.find().toArray();
        return boards;
    } catch (err) {
        logger.error('ERROR: Cannot find boards');
        throw err;
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board;
    } catch (err) {
        logger.error('ERROR: Cannot find board');
        throw err;
    }
}

async function update(id, board) {

    const collection = await dbService.getCollection('board');
    delete board._id;

    try {
        await collection.updateOne({ "_id": ObjectId(id) }, { $set: board });
        board._id = id;
        return board;
    } catch (err) {
        logger.error(`ERROR: Cannot update board ${board._id}`);
        throw err;
    }
}

async function add(board) {

    const collection = await dbService.getCollection('board');

    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        logger.error('ERROR: Cannot add board');
        throw err;
    }
}

async function remove(boardId) {

    const collection = await dbService.getCollection('board');

    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        logger.error(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     return criteria;
// }

module.exports = {
    query,
    getById,
    update,
    add,
    remove
}


