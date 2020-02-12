const initialState = {
  boards: [],
  board: {},
  filterBy: {title: '', teamMembers: ''}
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'UPDATE_BOARD':
      return { ...state, board: action.board };
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.addedBoard] };
    case 'UPDATE_FILTER':
      return { ...state, filterBy: action.filterBy };
    default:
      return state;
  }
}
