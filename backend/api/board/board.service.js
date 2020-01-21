const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

const logger = require('../../services/logger.service')

async function query() {

    const collection = await dbService.getCollection('board');

    try {
        const boards = await collection.find().toArray();
        return boards;
    } catch (err) {
        logger.error('ERROR: Cannot find boards');
        throw err;
    }
}

async function getById(boardId, filterBy = {}) {

    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) });
        const tasks = board.tasks;
        const filteredTasks = {};
        const unmatchedIds = [];
        if (filterBy.title) {
            for (const task in tasks) {
                let title = tasks[task];
                let lowerCaseFilterTitle = filterBy.title.toLowerCase();
                let lowerCaseTitle = title.title.toLowerCase();
                (lowerCaseTitle.includes(lowerCaseFilterTitle)) ?
                    filteredTasks[task] = tasks[task] :
                    unmatchedIds.push(task);
            }
            for (const column in board.columns) {
                for (const unmatchedId of unmatchedIds) {
                    if (board.columns[column].taskIds.includes(unmatchedId))
                    board.columns[column].taskIds = board.columns[column].taskIds.filter(id => id !== unmatchedId);
                }
            }
            console.log('board is the error');
            console.log(board);
            console.log('error');
            // delete board.tasks;
            // board.tasks = filteredTasks;
        }
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


