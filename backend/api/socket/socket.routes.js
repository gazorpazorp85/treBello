
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
            socket.on('boardUpdate', (board) => {
                socket.broadcast.to(socket.boardId).emit('updateBoard', board);
            })
            socket.on('boardId', boardId => {
                if (socket.boardId) {
                    socket.leave(socket.boardId)
                }
                socket.join(boardId)
                socket.boardId = boardId;
            })
            socket.on('sendNotification', (notification) => {
                socket.broadcast.to(socket.boardId).emit('getNotification', notification);
            })
    })
}