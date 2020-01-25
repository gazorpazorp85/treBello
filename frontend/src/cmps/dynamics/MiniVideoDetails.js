import React, { Component } from 'react';

import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

import utils from '../../services/utils'

export default class MiniVideoDetails extends Component {
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
        this.props.updateBoard(newBoard);
        this.props.onToggle();
        let msg = `${this.props.user} updated the task '${this.props.miniTask.task.title}' to '${this.state.title}'`;
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
        utils.emitNotification(msg, 'success');
    }

    render() {
        const { miniTask } = this.props;
        const videoDimensions = { height: 140, width: 246 };
        return <div className="mini-details-container">
            <div
                className="mini-details"
                style={{
                    left: miniTask.left + 'px',
                    top: miniTask.top + 'px',
                    height: miniTask.height + 'px'
                }}
            >
                <iframe title={miniTask.task.id}
                    type='text/html' width={videoDimensions.width}
                    height={videoDimensions.height}
                    src={miniTask.task.url}
                    allowFullScreen="allowfullscreen"></iframe>
                <textarea
                    name="title"
                    className="text-area"
                    style={{
                        height: miniTask.height - videoDimensions.height,
                        position: 'relative',
                        bottom: 8 + 'px'
                    }}
                    defaultValue={miniTask.task.title}
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
                    left: miniTask.left + 'px',
                    top: (miniTask.top + miniTask.height + (miniTask.task.title ? 10 : 32)) + 'px'
                }}
                onClick={this.onSave}
            >SAVE</button>
            <MiniDetailsEditor
                users={this.props.users}
                user={this.props.user}
                miniTask={this.props.miniTask}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                onToggle={this.props.onToggle} />
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}