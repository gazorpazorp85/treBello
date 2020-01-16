import ColumnService from '../services/ColumnService';

export function loadColumn(boardId, columnId) {
    return async dispatch => {
        try {
            const column = await ColumnService.get(boardId, columnId);
            dispatch(setColumn(column));
        } catch (err) {
            console.log('ColumnActions: err in loadColumn', err);
        }
    }
}

function setColumn(column) {
    return {
        type: 'SET_COLUMN',
        column
    }
}