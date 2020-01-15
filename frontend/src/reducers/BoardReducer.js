const initialState = {
  boards: [],
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    // case 'REVIEW_ADD':
    //   return { ...state, reviews: [...state.reviews, action.review] };
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
