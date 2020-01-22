import React, { Component } from 'react';

import MiniDetailsButton from './MiniDetailsButton';
import Labels from './Labels';

export default class MiniDetailsEditor extends Component {
    state = {
        onToggleLabels: false
    }

    onToggleLabels = _ => {
        this.setState(prevState => ({ onToggleLabels: !prevState.onToggleLabels }));
    }

    onDelete = _ => {
        const { miniTask } = this.props;
        const board = { ...this.props.board };
        const column = this.props.miniTask.column;
        const taskIds = column.taskIds
        const idx = taskIds.findIndex(taskId => taskId === miniTask.task.id);
        taskIds.splice(idx, 1);
        delete board.tasks[miniTask.task.id];
        this.props.updateBoard(board);
        this.props.onToggle();
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
            <MiniDetailsButton text="🖊️ Edit Labels" onToggle={this.onToggleLabels} />
            {this.state.onToggleLabels ? <Labels
                miniTask={miniTask}
                task={miniTask.task}
                toggleChooseLabels={this.onToggleLabels}
                board={this.props.board}
                updateBoard={this.props.updateBoard} /> : ''}
            <MiniDetailsButton text="🎭 Change Members" />
            <MiniDetailsButton text="🗑️ Delete Task" onToggle={this.onDelete} />
        </div>
    }
}