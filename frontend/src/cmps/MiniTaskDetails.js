import React, { Component } from 'react';

import ScreenFilter from './ScreenFilter';

export default class MiniTaskDetails extends Component {

    componentDidMount() {
        this.refs.textarea.focus();
    }

    handleFocus = ev => {
        ev.target.select();
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
                <img title={miniTask.task.id} alt="task" width="90%" src={miniTask.task.url} />

                <textarea
                    className="text-area"
                    defaultValue={miniTask.task.title}
                    ref="textarea"
                    onFocus={this.handleFocus}
                >
                </textarea>
            </div>
            <button
                className="mini-task-details-save-btn"
                style={{
                    left: miniTask.left + 'px',
                    top: (miniTask.top + 10) + 'px'
                }}
            >SAVE</button>
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}