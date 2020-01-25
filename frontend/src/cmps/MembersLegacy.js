import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils'

export default class Members extends Component {
    state = {
        choosenMembers: [],
        teamMembers: [],
        toggleAsignedMembersList: false,
        toggleMembersList: false,
        toggleUsersList: false
    }

    componentDidMount = () => {
        this.setState({
            choosenMembers: this.props.task.taskTeamMembers,
            teamMembers: this.props.board.teamMembers
        });
    }

    updateChoosenMembers = (teamMember) => {
        const member = teamMember;
        const choosenMembers = this.state.choosenMembers;
        const memberIdx = choosenMembers.findIndex(currMember => currMember.username === member.username);
        if (memberIdx >= 0) {
            choosenMembers.splice(memberIdx, 1);
            let msg = `${teamMember.username} was released from the task '${this.props.task.title}'`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'danger');
        } else {
            choosenMembers.push(member);
            let msg = `${teamMember.username} was asigned to the task '${this.props.task.title}'`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'success');
        }
        this.setState({ choosenMembers }, this.onSave);
    }

    updateTeamMembers = (user) => {
        const teamMembers = this.props.board.teamMembers;
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
        this.setState({ teamMembers })
    }

    toggleAsignedMembersList = () => {
        this.setState(prevState => ({ toggleAsignedMembersList: !prevState.toggleAsignedMembersList }));
    }

    toggleMembersList = () => {
        this.setState(prevState => ({ toggleMembersList: !prevState.toggleMembersList }));
    }

    toggleUsersList = () => {
        this.setState(prevState => ({ toggleUsersList: !prevState.toggleUsersList }));
    }

    onSave = () => {
        const newTask = { ...this.props.task, taskTeamMembers: this.state.choosenMembers };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        let updateStyle = null;
        if (this.props.miniTask) {
            updateStyle = {
                left: 12 + 'px',
                top: 36 + 'px',
            }
        }

        return (
            <div className="members-container text-center column"
                onClick={(ev) => this.onStopPropagation(ev)}
                style={{ ...updateStyle }}>
                <CloseIcon className="members-container-close-btn" onClick={this.props.toggleChooseMembers} />

                {/* <p className="pointer uppercase" onClick={this.toggleAsignedMembersList}>asigned members</p>
                <hr /> */}
                {/* <div className="members-container-colors-container flex column">
                    {this.state.toggleAsignedMembersList && this.props.task.taskTeamMembers.map(member => {
                        return (
                            <div key={member.username} className="team-member flex">
                                <div className="team-member-icon-wrapper flex align-center justify-center"
                                    style={{ backgroundColor: `${member.color}` }} >
                                    <div className="team-member-icon">
                                        <p>
                                            {utils.createUserIcon(member.firstName,
                                                member.lastName)}
                                        </p>
                                    </div>
                                </div>
                                <span>{member.firstName} {member.lastName}</span>
                            </div>
                        )
                    })}
                </div> */}

                <div className="members-container-colors-container flex column">
                    <p className="pointer uppercase" onClick={this.toggleMembersList}>asign / release member</p>
                    <hr />
                    {this.state.toggleMembersList && this.state.teamMembers.map(teamMember => {
                        return (
                            <div key={teamMember._id}
                                className="team-member flex align-center"
                                onClick={() => this.updateChoosenMembers(teamMember)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: `${teamMember.color}` }} >
                                    <div className="team-member-icon">
                                        <p>
                                            {utils.createUserIcon(teamMember.firstName,
                                                teamMember.lastName)}
                                        </p>
                                    </div>
                                </div>
                                <span className="capitalize">{teamMember.firstName} {teamMember.lastName}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="add-team-members flex column">
                    <p className="pointer uppercase" onClick={this.toggleUsersList}>add / remove users to board</p>
                    {this.state.toggleUsersList && this.props.users.map(user => {
                        return (
                            <div key={user._id} className="team-member flex"
                                onClick={() => this.updateTeamMembers(user)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center"
                                    style={{ backgroundColor: `${user.color}` }}>
                                    <div className="team-member-icon">
                                        <p>
                                            {utils.createUserIcon(user.firstName,
                                                user.lastName)}
                                        </p>
                                    </div>
                                </div>
                                <span className="capitalize">{user.firstName} {user.lastName}</span>
                            </div>
                        )
                    })}
                </div>
            </div >
        );
    }
}
