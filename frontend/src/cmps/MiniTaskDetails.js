import React, { Component } from 'react';

import ScreenFilter from './ScreenFilter';

export default class MiniTaskDetails extends Component {
    state = {
        title: '',
    }

    componentDidMount() {
        this.refs.textarea.focus();
    }

    handleFocus = ev => {
        ev.target.select();
    }

    emitChange = (ev) => {
        const targetValue = ev.target.value;
        this.setState({ title: targetValue });
    }

    onSave = _ => {
        const newTask = { ...this.props.miniTask.task, title: this.state.title };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
        this.props.onToggle();
    }

    render() {
        const { miniTask } = this.props;
        return <div className="mini-task-details-container">
            <div
                className="mini-task-details"
                style={{
                    left: miniTask.left + 'px',
                    top: miniTask.top + 'px',
                    height: miniTask.height + 'px'
                }}
            >
                <textarea
                    name="title"
                    className="text-area"
                    defaultValue={miniTask.task.title}
                    ref="textarea"
                    onFocus={this.handleFocus}
                    onInput={this.emitChange}
                    placeholder="Add a task title..."
                >
                </textarea>
            </div>
            <button
                className="mini-task-details-save-btn"
                style={{
                    left: miniTask.left + 'px',
                    top: (miniTask.top + 10) + 'px'
                }}
                onClick={this.onSave}
            >SAVE</button>
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}