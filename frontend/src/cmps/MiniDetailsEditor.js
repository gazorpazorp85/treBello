import React, { Component } from 'react';

import MiniDetailsButton from './MiniDetailsButton';
import Labels from './Labels';
import DueDate from './DueDate';
import Members from './Members';

import utils from '../services/utils';

export default class MiniDetailsEditor extends Component {
    state = {
        onToggleLabels: false,
        onToggleDueDate: false,
        onToggleMembers: false
    }

    onToggleLabels = _ => {
        this.setState(prevState => ({ onToggleLabels: !prevState.onToggleLabels }));
    }

    onToggleDueDate = _ => {
        this.setState(prevState => ({ onToggleDueDate: !prevState.onToggleDueDate }));
    }

    onToggleMembers = _ => {
        this.setState(prevState => ({ onToggleMembers: !prevState.onToggleMembers }));
    }

    onDuplicateTask = _ => {
        const { task } = this.props.miniTask
        const newTask = { ...task, id: utils.getRandomId(), labels: [...task.labels], todos: [...task.todos], taskTeamMembers: [...task.taskTeamMembers]};
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        newBoard.columns[this.props.miniTask.column.id].taskIds.push(newTask.id);
        const msg = `The task '${task.title}' was duplicated by ${this.props.user}`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.onToggle();
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
        const msg = `'${task.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger'; 
        this.props.updateBoard(board, msg, notificationType);
        this.props.onToggle();
    }

    render() {
        const { miniTask } = this.props;
        const { boundingClientRect } = this.props.miniTask;
        let top = boundingClientRect.top;

        if(top + 180 > window.innerHeight){
            top = window.innerHeight - 180;
        }

        return <div
            className="mini-details-editor"
            style={{
                left: (boundingClientRect.left + 265) + 'px',
                top: (top + 1) + 'px'
            }}
        >
            <MiniDetailsButton text="🖊️ Edit Labels" onClick={this.onToggleLabels} />
            {this.state.onToggleLabels ? <Labels
                miniTask={miniTask}
                task={miniTask.task}
                toggleChooseLabels={this.onToggleLabels}
                board={this.props.board}
                updateBoard={this.props.updateBoard} /> : ''}
            <MiniDetailsButton text="🎭 Change Members" onClick={this.onToggleMembers} />
            {this.state.onToggleMembers ? <Members
                pos={true}
                task={miniTask.task}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                toggleChooseMembers={this.onToggleMembers}
            /> : ''}
            <MiniDetailsButton text="📅 Change Due Date" onClick={this.onToggleDueDate} />
            {this.state.onToggleDueDate ? <DueDate
                task={miniTask.task}
                onToggle={this.onToggleDueDate}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
            /> : ''}
            <MiniDetailsButton text="⎘ Duplicate Task" onClick={this.onDuplicateTask} />
            <MiniDetailsButton text="🗑️ Delete Task" onClick={this.onDelete} />
        </div>
    }
}