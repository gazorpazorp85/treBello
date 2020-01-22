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

async function getById(boardId, filterBy = {}, sortBy, sortOrder) {

    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) });

        if (filterBy.title) _filterBoard(board, filterBy);
        if (sortBy) _sortBoard(board, sortBy, sortOrder);
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

function _filterBoard(board, filterBy) {
    const tasks = board.tasks;
    const unmatchedIds = [];
    for (const task in tasks) {
        let title = tasks[task].title;
        let lowerCaseFilterTitle = filterBy.title.toLowerCase();
        let lowerCaseTitle = title.toLowerCase();
        (lowerCaseTitle.includes(lowerCaseFilterTitle)) ?
            tasks[task] :
            unmatchedIds.push(task);
    }
    for (const column in board.columns) {
        for (const unmatchedId of unmatchedIds) {
            if (board.columns[column].taskIds.includes(unmatchedId))
                board.columns[column].taskIds = board.columns[column].taskIds.filter(id => id !== unmatchedId);
        }
    }
    return board;
}

function _sortBoard(board, sortBy, sortOrder) {

    let tasks = board.tasks;
    let keys = Object.keys(tasks);
    const tasksArray = Object.values(tasks);
    
    if (sortBy === 'createdAt') {
        tasksArray.sort((a, b) => b.createdAt - a.createdAt);
        tasks = tasksArray.reduce((acc, task) => {
            return { ...acc, [task.id]: task };
        }, {});
    }
    
    for (const column in board.columns) {
        let sortedTasks = [];
        for (const key of keys) {
            if (board.columns[column].taskIds.includes(key))
                sortedTasks.push(key);
        }
        if (sortedTasks.length === 0) {
            board.columns[column].taskIds = sortedTasks;
        } else {
            sortedTasks = ((sortOrder === 'asc') ? sortedTasks : sortedTasks.reverse());
            board.columns[column].taskIds = sortedTasks;
        };
    }

    return board;
}

module.exports = {
    query,
    getById,
    update,
    add,
    remove
}


