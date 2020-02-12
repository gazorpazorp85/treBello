import React, { Component } from 'react';
import moment from 'moment';

export default class BoardHistory extends Component {
    render() {
        return (
            <div className="boardhistory-container column">
                <div className="flex column">
                    <div className="uppercase text-center">
                        <h2>board history :</h2>
                    </div>
                    <hr />
                </div>
                <ul className="clean-list">
                    {this.props.history.map(item => (
                        <li key={item.id}><div className="msg">{item.msg}<br />{moment(item.time).calendar()}</div><hr /></li>

                    ))}
                </ul>
            </div>
        )
    }
}