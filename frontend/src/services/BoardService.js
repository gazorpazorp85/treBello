import HttpService from './HttpService';

export default {
  add,
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

// function _createQueryString(filterBy) {
//   return Object.keys(filterBy).map(filter => filter + '=' + filterBy[filter]).join('&');
// }

function put(board) {
  return HttpService.put(`board/${board._id}`, board);
}

function remove(boardId) {
  return HttpService.delete(`board/${boardId}`);
}

function add(board) {
  return HttpService.post('board', board);
}