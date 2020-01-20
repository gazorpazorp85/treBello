import BoardService from '../services/BoardService';

export function loadBoards() {
  return async dispatch => {
    try {
      const boards = await BoardService.query();
      dispatch(_setBoards(boards));
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    }
  };
}

function _setBoards(boards) {
  return {
    type: 'SET_BOARDS',
    boards
  };
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await BoardService.get(boardId);
      dispatch(_setBoard(board));
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

function _setBoard(board) {
  return {
    type: 'SET_BOARD',
    board
  }
}

export function updateBoard(board) {
  return async dispatch => {
    try {
      dispatch(_boardUpdate(board));
      await BoardService.put(board);
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

function _boardUpdate(board) {
  return {
    type: 'UPDATE_BOARD',
    board
  }
}

export function updateBoardOffline(board) {
  return async dispatch => {
    try {
      dispatch(_boardUpdate(board));
      sessionStorage.setItem('board', JSON.stringify(board));
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

export function createBoard(board) {
  return async dispatch => {
    try {
      const addedBoard = await BoardService.add(board);
      dispatch(_addBoard(addedBoard));
    } catch (err) {
      console.log('BoardActions: err in createBoard', err);
    }
  }

  function _addBoard(addedBoard) {
    return {
      type: 'ADD_BOARD',
      addedBoard
    };
  }
}
