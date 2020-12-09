const initialState = {
  boards: [],
  board: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'UPDATE_BOARD':
      return { ...state, board: action.board };
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.addedBoard] };
    default:
      return state;
  }
}
