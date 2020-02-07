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

async function getById(boardId, sortBy, sortOrder) {

    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) });

        // if (filterBy) _filterBoard(board, filterBy);
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
        logger.error('ERROR: Cannot update board');
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
        logger.error('ERROR: cannot remove board')
        throw err;
    }
}

// function _filterBoard(board, filterBy) {

//     const tasks = board.tasks;
//     const columns = {...board.columns};
//     const matchedIds = [];
//     const unmatchedIds = [];

//     for (const taskKey in tasks) {

//         let task = tasks[taskKey];
//         let filterTitle = filterBy.title.toLowerCase();
//         let title = task.title.toLowerCase();

//         (title.includes(filterTitle)) ? matchedIds.push(taskKey) : unmatchedIds.push(taskKey);
//     }
//     if (filterBy.teamMembers) {
//         for (const id of matchedIds) {
//             let task = tasks[id];
//             let teamMember = filterBy.teamMembers;
//             let taskTeamMembers = task.taskTeamMembers;
//             if (taskTeamMembers.length === 0) {
//                 unmatchedIds.push(id);
//             } else {
//                 if (taskTeamMembers.every((taskTeamMember) => (taskTeamMember.username !== teamMember))) unmatchedIds.push(id);
//             }
//         }
//     }

//     for (const column in columns) {
//         for (const unmatchedId of unmatchedIds) {
//             if (columns[column].taskIds.includes(unmatchedId))
//                 columns[column].taskIds = columns[column].taskIds.filter(id => id !== unmatchedId);
//         }
//     }
//     return board;
// }

function _sortBoard(board, sortBy, sortOrder) {

    let tasks = board.tasks;
    let keys = Object.keys(tasks);
    const tasksArray = Object.values(tasks);

    if (sortBy === 'createdAt') {
        tasksArray.sort((a, b) => a.createdAt - b.createdAt);
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
