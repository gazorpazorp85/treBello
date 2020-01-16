const initialState = {
  boards: [],
  board: {}
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'SET_BOARD':
      return { ...state, board: action.board };
    case 'UPDATE_BOARD':
      return { ...state, board: action.board };
    // case 'REVIEW_UPDATE':
    //   return {
    //     ...state,
    //     reviews: state.reviews.map(review =>
    //       review._id === action.review._id ? action.review : review
    //     )};
    default:
      return state;
  }
}
