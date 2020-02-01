import React, { Component } from 'react';

import utils from '../services/utils';

export default class TopMenuOptions extends Component {

    onDuplicateColumn = () => {

        let column = this.props.column;
        let board = this.props.board;
        let newColumn = { ...this.props.column }
        const newId = utils.getRandomId();
        const idx = board.columnOrder.findIndex(columnId => columnId === column.id);

        newColumn.id = newId;
        board.columnOrder.splice(idx + 1, 0, newColumn.id);

        newColumn.taskIds.forEach(taskId => {

            const clonedTaskId = utils.getRandomId();
            const taskIdIdx = column.taskIds.findIndex(taskIdx => taskIdx === taskId);

            board.tasks[clonedTaskId] = { ...board.tasks[taskId], id: clonedTaskId }
            newColumn.taskIds = [...newColumn.taskIds];
            newColumn.taskIds.splice(taskIdIdx, 1, clonedTaskId);
        });

        board.columns[newId] = newColumn;
        this.props.toggleTopMenuOptions(column.id);
        const msg = `'${column.title}' was duplicated by ${this.props.user}`;
        const notificationType = 'success';
        this.props.updateBoard(board, msg, notificationType);
    }

    render() {
        return <div className="top-menu-options">
            <h2 className="text-center capitalize">options menu</h2>
            <div className="options-container flex column">
                <p className="capitalize" onClick={this.onDuplicateColumn}>duplicate list</p>
                <p className="capitalize" onClick={() => this.props.onDelete(this.props.column.id)}>delete list</p>
            </div>

        </div>
    }
}