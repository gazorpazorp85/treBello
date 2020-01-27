import React, { Component } from 'react';

import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

import utils from '../../services/utils';

export default class MiniImageDetails extends Component {
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
        const newTask = { ...this.props.miniTask.task, title: this.state.title ? this.state.title : this.props.miniTask.task.title };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `${this.props.user} updated the task '${this.props.miniTask.task.title}' to '${this.state.title}'`;
        const notificationType = 'success';
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.onToggle();
    }

    render() {
        const { task } = this.props.miniTask;
        const { boundingClientRect } = this.props.miniTask;
        const labelLen = task.labels.length;
        return <div className="mini-details-container">
            <div
                className="mini-details"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: boundingClientRect.top + 'px',
                    height: boundingClientRect.height + 'px'
                }}
            >
                <img title={task.id} alt="task" src={task.url} />
                <div className="task-container-labels flex">
                    {task.labels.map(label => {
                        return <div key={label} className={label + ' small-label'}>
                        </div>
                    })
                    }
                </div>
                <textarea
                    name="title"
                    className={"text-area" + (labelLen > 0 ? ' preview-label' : '')}
                    style={{
                        height: boundingClientRect.height - 220,
                        position: 'relative',
                    }}
                    defaultValue={task.title}
                    ref="textarea"
                    onFocus={this.handleFocus}
                    onInput={this.emitChange}
                    placeholder="Add a task title..."
                >
                </textarea>
            </div>
            <button
                className="mini-details-save-btn"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: (boundingClientRect.top + boundingClientRect.height + (task.title ? 10 : 32)) + 'px'
                }}
                onClick={this.onSave}
            >SAVE</button>
            <MiniDetailsEditor
                user={this.props.user}
                miniTask={this.props.miniTask}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                onToggle={this.props.onToggle} />
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}