const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addBoard, getBoards, getBoard, updateBoard, deleteBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/',  requireAuth, addBoard)
router.put('/:id', updateBoard)
router.delete('/:id',  requireAuth, deleteBoard)

module.exports = router