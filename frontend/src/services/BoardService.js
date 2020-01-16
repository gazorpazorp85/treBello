import HttpService from './HttpService';

export default {
  // add,
  query,
  get,
  put
  // remove
};

function query() {
  return HttpService.get('board');
}

function get(boardId) {
  return HttpService.get(`board/${boardId}`);
}

function put(board) {
  return HttpService.put(`board/${board.id}`, board);
}

// function remove(reviewId) {
//   return HttpService.delete(`review/${reviewId}`);
// }
// async function add(review) {
//   const addedReview  = await HttpService.post(`review`, review);
//   return  addedReview
// }
