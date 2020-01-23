import React, { Component } from 'react';

import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

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
        const videoDimensions = { height: 142, width: 253 };
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
                    src={miniTask.task.url}></iframe>
                <textarea
                    name="title"
                    className="text-area"
                    style={{
                        height: miniTask.height - videoDimensions.height - 8,
                        position: 'relative',
                        top: -3 + 'px'
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
                    top: (miniTask.top + 10) + 'px'
                }}
                onClick={this.onSave}
            >SAVE</button>
            <MiniDetailsEditor 
             miniTask={this.props.miniTask}
             board={this.props.board}
             updateBoard={this.props.updateBoard}
             onToggle={this.props.onToggle}/>
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}