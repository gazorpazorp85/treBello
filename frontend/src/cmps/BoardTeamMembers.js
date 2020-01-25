import React, { Component } from 'react';

import utils from '../services/utils'

export default class BoardTeamMembers extends Component {
    state = {
        currentBoardMembers: [],
        toggleUsersList: false
    }

    componentDidMount = () => {
        this.setState({ currentBoardMembers: this.props.board.teamMembers });
    }

    updateTeamMembers = (user) => {
        const board = this.props.board;
        const teamMembers = board.teamMembers;
        if (teamMembers.length === 0) {
            teamMembers.push(user);
            let msg = `${user.username} was added to this board`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'success');
        } else if (teamMembers.find(teamMember => teamMember._id === user._id)) {
            const idx = teamMembers.findIndex(teamMember => teamMember._id === user._id);
            teamMembers.splice(idx, 1);
            let msg = `${user.username} was removed from this board`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'danger');
        } else {
            teamMembers.push(user);
            let msg = `${user.username} was added to this board`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'success');
        }
        this.setState({ currentBoardMembers: teamMembers });
        this.props.updateBoard(board);
    }

    toggleUsersList = () => {
        this.setState(prevState => ({ toggleUsersList: !prevState.toggleUsersList }));
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        return (
                <div className={"board-team-members-container text-center column"
                    + (this.props.toggleBoardTeamMembers ? ' translateLeft' : '')} onClick={(ev) => this.onStopPropagation(ev)}>

                    <div className="members-container-colors-container flex column">
                        <div className="pointer uppercase"><h2>board members :</h2></div>
                        <hr />
                        {this.state.currentBoardMembers.map(teamMember => {
                            return (
                                <div key={teamMember._id} className="team-member flex align-center">
                                    <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: `${teamMember.color}` }} >
                                        <div className="team-member-icon">
                                            <p className="capitalize">
                                                {utils.createUserIcon(teamMember.firstName, teamMember.lastName)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="capitalize">{teamMember.firstName} {teamMember.lastName}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="add-team-members flex column">
                        <p className="pointer uppercase" onClick={this.toggleUsersList}>add / remove users</p>
                        {this.state.toggleUsersList && this.props.users.map(user => {
                            return (
                                <div key={user._id} className="team-member flex align-center"
                                    onClick={() => this.updateTeamMembers(user)}>
                                    <div className="team-member-icon-wrapper flex align-center justify-center"
                                        style={{ backgroundColor: `${user.color}` }}>
                                        <div className="team-member-icon">
                                            <p className="capitalize">
                                                {utils.createUserIcon(user.firstName, user.lastName)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="capitalize">{user.firstName} {user.lastName}</span>
                                </div>
                            )
                        })}
                    </div>
            </div>
        );
    }
}
