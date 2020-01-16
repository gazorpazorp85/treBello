import HttpService from './HttpService';

export default {
    get
}

function get(boardId, columnId) {
    return HttpService.get(`board/${boardId}/${columnId}`);
}