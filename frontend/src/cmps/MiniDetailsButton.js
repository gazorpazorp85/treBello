import React, { Component } from 'react';

export default class MiniDetailsButton extends Component {

    render() {
        const { text, onClick } = this.props;
        return <div className="mini-details-editor-button"
            onClick={onClick}>
            <p>{text}</p>
        </div>
    }
}