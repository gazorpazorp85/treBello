import React, { Component } from 'react';

export default class MiniDetailsButton extends Component {

    render() {
        const { text, onToggle } = this.props;
        return <div className="mini-details-editor-button"
            onClick={onToggle}>
            <p>{text}</p>
        </div>
    }
}