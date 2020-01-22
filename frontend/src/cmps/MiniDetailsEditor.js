import React, { Component } from 'react';

import MiniDetailsButton from './MiniDetailsButton';

export default class MiniDetailsEditor extends Component {

    render() {
        const { miniTask } = this.props;
        return <div
            className="mini-details-editor"
            style={{
                left: (miniTask.left + 265) + 'px',
                top: (miniTask.top + 1) + 'px'
            }}
        >
            <MiniDetailsButton text="🖊️ Edit Labels" />
            <MiniDetailsButton text="🎭 Change Members" />
            <MiniDetailsButton text="🗑️ Delete Task" />
        </div>
    }
}