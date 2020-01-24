import React, { Component } from 'react';
import moment from 'moment';

export default class BoardHistory extends Component {
    render() {
        const history = this.props.board.history.reverse();
        return (
            <div className={"boardhistory-container flex column"
                + (this.props.showHistory ? ' translateLeft' : '')}>
                <ul className="clean-list">
                    {history.map(item => (
                        <li key={item.id}><div className="msg">{item.msg}<br/>{moment(item.time).calendar()}</div><hr /></li>

                    ))}
                </ul>
            </div>

        )
    }
}