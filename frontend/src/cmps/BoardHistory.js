import React, { Component } from 'react';
import moment from 'moment';

export default class BoardHistory extends Component {
    render() {
        return (
                <div className={"boardhistory-container flex column"
                    + (this.props.showHistory ? ' translateLeft' : '')}>
                    <p className="uppercase title">
                        <h2>board history :</h2>
                    </p>
                    
                    <ul className="clean-list">
                        {this.props.history.map(item => (
                            <li key={item.id}><div className="msg">{item.msg}<br />{moment(item.time).calendar()}</div><hr /></li>

                        ))}
                    </ul>
                </div>
        )
    }
}