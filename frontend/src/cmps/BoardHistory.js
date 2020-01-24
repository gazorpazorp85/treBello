import React, { Component } from 'react';
import moment from 'moment';

export default class BoardHistory extends Component {
    render() {
        const history = this.props.board.history;
        return (
            <div>
                <ul>
                {history.map(item => (
                    <li key={item.id}>{item.msg} {moment(item.time).calendar()}</li>
                ))}
                </ul>
            </div>

        )
    }
}