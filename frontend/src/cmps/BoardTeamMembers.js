import React, { Component } from 'react';

import utils from '../services/utils'

export default class BoardTeamMembers extends Component {
    state = {
        currentBoardMembers: []
    }

    componentDidMount = () => {
        this.setState({ currentBoardMembers: this.props.board.teamMembers });
    }

    updateTeamMembers = (user) => {
        const board = this.props.board;
        const teamMembers = board.teamMembers;
        let msg = '';
        let notificationType = '';
        if (teamMembers.find(teamMember => teamMember._id === user._id)) {
            const idx = teamMembers.findIndex(teamMember => teamMember._id === user._id);
            teamMembers.splice(idx, 1);
            msg = `${user.username} was removed from this board`;
            notificationType = 'danger';
        } else {
            teamMembers.push(user);
            msg = `${user.username} was added to this board`;
            notificationType = 'success';
        }
        this.setState({ currentBoardMembers: teamMembers });
        this.props.updateBoard(board, msg, notificationType);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        const currentBoardMembers = this.state.currentBoardMembers;
        const users = this.props.users.filter(user => !currentBoardMembers.find(boardMember => user._id === boardMember._id));
        return (
            <div className="board-team-members-container text-center column"
               onClick={(ev) => this.onStopPropagation(ev)}>

                <div className="members-container-colors-container flex column">
                    <div className="pointer uppercase"><h2>board members :</h2></div>
                    <hr />
                    {this.state.currentBoardMembers.map(teamMember => {
                        return (
                            <div key={teamMember._id} className="team-member flex align-center"
                                onClick={() => this.updateTeamMembers(teamMember)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6', color: '#172b4d' }} >
                                    <div className="team-member-icon">
                                        <p className="capitalize" style={{ color: '#172b4d' }}>
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
                    <p className="pointer uppercase">add / remove users</p>
                    {users.map(user => {
                        return (
                            <div key={user._id} className="team-member flex align-center"
                                onClick={() => this.updateTeamMembers(user)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center"
                                    style={{ backgroundColor: '#dfe1e6' }}>
                                    <div className="team-member-icon">
                                        <p className="capitalize" style={{ color: '#172b4d' }}>
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
