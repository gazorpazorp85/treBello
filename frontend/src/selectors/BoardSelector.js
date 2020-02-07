import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getBoard = state => state.boards.board;
const getFilterBy = state => state.boards.filterBy;

export const filterBoard = createSelector(
    [getBoard, getFilterBy],
    (board, filterBy) => {
        const tasks = board.tasks;
        const columns = board.columns;
        const matchedIds = [];
        const unmatchedIds = [];

        for (const taskKey in tasks) {

            let task = tasks[taskKey];
            let filterTitle = filterBy.title.toLowerCase();
            let title = task.title.toLowerCase();

            (title.includes(filterTitle)) ? matchedIds.push(taskKey) : unmatchedIds.push(taskKey);
        }

        if (filterBy.teamMembers) {
            for (const id of matchedIds) {
                let task = tasks[id];
                let teamMember = filterBy.teamMembers;
                let taskTeamMembers = task.taskTeamMembers;
                if (taskTeamMembers.length === 0) {
                    unmatchedIds.push(id);
                } else {
                    if (taskTeamMembers.every((taskTeamMember) => (taskTeamMember.username !== teamMember))) unmatchedIds.push(id);
                }
            }
        }

        for (const column in columns) {
            for (const unmatchedId of unmatchedIds) {
                if (columns[column].taskIds.includes(unmatchedId))
                    columns[column].taskIds = columns[column].taskIds.filter(id => id !== unmatchedId);
            }
        }
        // console.log('filteredBoard: ', filteredBoard);
        // this.props.onFilter(filteredBoard);
        console.log(board);
        return board;
    }
)