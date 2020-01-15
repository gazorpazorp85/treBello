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

// export function addReview(review) {
//   return async dispatch => {
//     try {
//       const addedReview = await ReviewService.add(review);
//       dispatch(_addReview(addedReview));
//     } catch (err) {
//       console.log('ReviewActions: err in addReview', err);
//     }
//   };
// }

function setBoards(boards) {
  return {
    type: 'SET_BOARDS',
    boards
  };
}

// function _addReview(review) {
//   return {
//     type: 'REVIEW_ADD',
//     review
//   };
// }
