import HttpService from './HttpService';

export default {
  // add,
  query,
  get,
  put,
  remove
};

function query() {
  return HttpService.get('board');
}

function get(boardId) {
  return HttpService.get(`board/${boardId}`);
}

function put(board) {
  return HttpService.put(`board/${board._id}`, board);
}

function remove(boardId) {
  return HttpService.delete(`board/${boardId}`);
}
// async function add(review) {
//   const addedReview  = await HttpService.post(`review`, review);
//   return  addedReview
// }
