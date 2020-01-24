import React, { Component } from 'react';

import MiniDetailsButton from './MiniDetailsButton';
import Labels from './Labels';
import DueDate from './DueDate';

import utils from '../services/utils';

export default class MiniDetailsEditor extends Component {
    state = {
        onToggleLabels: false,
        onToggleDueDate: false
    }

    onToggleLabels = _ => {
        this.setState(prevState => ({ onToggleLabels: !prevState.onToggleLabels }));
    }

    onToggleDueDate = _ => {
        this.setState(prevState => ({ onToggleDueDate: !prevState.onToggleDueDate }));
    }

    onDelete = _ => {
        const { miniTask } = this.props;
        const board = { ...this.props.board };
        const column = this.props.miniTask.column;
        const taskIds = column.taskIds;
        const task = board.tasks[miniTask.task.id];
        const idx = taskIds.findIndex(taskId => taskId === miniTask.task.id);
        taskIds.splice(idx, 1);
        delete board.tasks[miniTask.task.id];
        this.props.updateBoard(board);
        this.props.onToggle();
        let msg = `'${task.title}' was deleted by ` + this.props.user;
        this.props.board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() })
        utils.emitNotification(msg, 'danger');
    }

    render() {
        const { miniTask } = this.props;
        return <div
            className="mini-details-editor"
            style={{
                left: (miniTask.left + 265) + 'px',
                top: (miniTask.top + 1) + 'px'
            }}
        >
            <MiniDetailsButton text="🖊️ Edit Labels" onClick={this.onToggleLabels} />
            {this.state.onToggleLabels ? <Labels
                miniTask={miniTask}
                task={miniTask.task}
                toggleChooseLabels={this.onToggleLabels}
                board={this.props.board}
                updateBoard={this.props.updateBoard} /> : ''}
            <MiniDetailsButton text="🎭 Change Members" />
            <MiniDetailsButton text="📅 Due Date" onClick={this.onToggleDueDate} />
            {this.state.onToggleDueDate ? <DueDate
                task={miniTask.task}
                onToggle={this.onToggleDueDate}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
            /> : ''}
            <MiniDetailsButton text="🗑️ Delete Task" onClick={this.onDelete} />
        </div>
    }
}