import React, { Component } from 'react';

import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

import utils from '../../services/utils';

export default class MiniTextDetails extends Component {
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
        let msg = this.props.user + ` changed the title of the task '${this.props.miniTask.task.title}' to '${this.state.title}'`;
        this.props.board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
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
        const labelLen = miniTask.task.labels.length;
        return <div className="mini-details-container">
            <div
                className="mini-details"
                style={{
                    left: miniTask.left + 'px',
                    top: miniTask.top + 'px',
                    height: miniTask.height + 'px'
                }}
            >
                <div className="task-container-labels flex">
                    {miniTask.task.labels.map(label => {
                        return <div key={label} className={label + ' small-label'}>
                        </div>
                    })
                    }
                </div>
                <textarea
                    name="title"
                    className={"text-area" + (labelLen > 0 ? ' preview-label' : '')}
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
                    top: (miniTask.top + 10) + 'px'
                }}
                onClick={this.onSave}
            >SAVE</button>
            <MiniDetailsEditor
                miniTask={this.props.miniTask}
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                onToggle={this.props.onToggle}
            />
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}