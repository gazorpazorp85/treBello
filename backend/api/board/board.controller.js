const logger = require('../../services/logger.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query();
        res.send(boards);
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'Cannot get boards' });
    }
}

async function getBoard(req, res) {
    const id = req.params.id;
    try {
        const board = await boardService.getById(id);
        res.send(board);
    } catch (err) {
        logger.error('Cannot get board', err);
        res.status(500).send({ error: 'Cannot get board' });
    }
}

async function addBoard(req, res) {

    try {
        const board = await boardService.add(req.body);
        res.send(board);
    } catch (err) {
        logger.error('Cannot create board', err);
        res.status(500).send({ error: 'Cannot create board' });
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err);
        res.status(500).send({ error: 'Cannot delete board' });
    }
}

async function updateBoard(req, res) {

    const id = req.params.id;
    try {
        const board = await boardService.update(id, req.body);
        res.send(board);
    } catch (err) {
        logger.error('Cannot update board', err);
        res.status(500).send({ error: 'Cannot update board' });
    }
}

module.exports = {
    getBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard
}