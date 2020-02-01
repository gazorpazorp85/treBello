import React, { Component } from 'react';

import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

export default class MiniVideoDetails extends Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    state = {
        title: '',
    }

    componentDidMount() {
        this.textArea.current.focus();
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
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.onToggle();
    }

    render() {
        const { task } = this.props.miniTask;
        const { boundingClientRect } = this.props.miniTask;
        const videoDimensions = { height: 140, width: 246 };
        const labelLen = task.labels.length;
        let height = boundingClientRect.height;
        let top = boundingClientRect.top;

        if (height + top > window.innerHeight) {
            height = (window.innerHeight - top - 50) > 248 ? window.innerHeight - top - 50 : 248;
        }
        if (boundingClientRect.top > (window.innerHeight - (window.innerHeight / 4))) {
            top = window.innerHeight - height - 50;
        }
        return <div className="mini-details-container">
            <div
                className="mini-details"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: top + 'px',
                    height: height + 'px'
                }}
            >
                <iframe title={task.id}
                    type='text/html' width={videoDimensions.width}
                    height={videoDimensions.height}
                    src={task.url}
                    allowFullScreen="allowfullscreen"></iframe>
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
                        height: height - videoDimensions.height,
                        position: 'relative',
                        bottom: 14 + 'px'
                    }}
                    defaultValue={task.title}
                    ref={this.textArea}
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
                    top: (top + height + (task.title ? 10 : 32)) + 'px'
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