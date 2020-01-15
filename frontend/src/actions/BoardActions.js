import BoardService from '../services/BoardService';

export function loadBoards() {
  return async dispatch => {
    try {
      const boards = await BoardService.query();
      dispatch(setBoards(boards));    
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    }
  };
}

function setBoards(boards) {
  return {
    type: 'SET_BOARDS',
    boards
  };
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await BoardService.get(boardId);
      dispatch(setBoard(board));
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

function setBoard(board) {
  return {
    type: 'SET_BOARD',
    board
  }
}