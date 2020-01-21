import React, { Component } from 'react';

import ScreenFilter from './ScreenFilter';

export default class MiniTaskDetails extends Component {

    render() {
        return <div className="mini-task-details-container">
            <div
                className="mini-task-details"
                style={{
                    left: this.props.pos.left + 'px',
                    top: this.props.pos.top + 'px',
                    height: this.props.pos.height + 'px'
                }}
            >
                <p>this is mini details</p>
            </div>
            <button
                className="mini-task-details-save-btn"
                style={{
                    left: this.props.pos.left + 'px',
                    top: (this.props.pos.top + 10) + 'px'
                }}
            >SAVE</button>
            <ScreenFilter onToggle={this.props.onToggle} />
        </div >
    }
}