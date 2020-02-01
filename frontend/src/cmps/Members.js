import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils';

export default class Members extends Component {
    state = {
        choosenMembers: [],
        availableMembers: []
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ choosenMembers: this.props.task.taskTeamMembers }, this.setAvailableMembers);
    }

    updateChoosenMembers = (teamMember) => {
        const choosenMembers = this.state.choosenMembers;
        const memberIdx = choosenMembers.findIndex(currMember => currMember._id === teamMember._id);
        let msg = '';
        let notificationType = '';
        if (memberIdx >= 0) {
            choosenMembers.splice(memberIdx, 1);
            msg = `${teamMember.username} was released from the task '${this.props.task.title}'`;
            notificationType = 'danger';
        } else {
            choosenMembers.push(teamMember);
            msg = `${teamMember.username} was asigned to the task '${this.props.task.title}'`;
            notificationType = 'success';
        }
        this.setState({ choosenMembers }, this.setAvailableMembers(msg, notificationType));
    }

    setAvailableMembers = (msg, notificationType) => {
        const availableMembers = this.props.board.teamMembers.filter(currMember => !this.state.choosenMembers.find(taskMember => taskMember._id === currMember._id));
        this.setState({ availableMembers }, this.onSave(msg, notificationType));
    }

    onSave = (msg, notificationType) => {
        const newTask = { ...this.props.task, taskTeamMembers: this.state.choosenMembers };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        let updateStyle = null;
        if (this.props.pos) {
            updateStyle = {
                left: 10 + 'px',
                top: 72 + 'px',
            }
        }

        return (
            <div className="members-container text-center column"
                onClick={(ev) => this.onStopPropagation(ev)}
                style={{ ...updateStyle }}>
                <CloseIcon className="members-container-close-btn" onClick={this.props.toggleChooseMembers} />
                <p className="uppercase">assigned members</p>
                <hr />
                <div className="members-container-colors-container flex column">
                    {this.props.task.taskTeamMembers.map(member => {
                        return <div key={member._id} className="team-member flex"
                            onClick={() => this.updateChoosenMembers(member)}>
                            <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6', color: '#172b4d' }} >
                                <div className="team-member-icon">
                                    <p>
                                        {utils.createUserIcon(member.firstName,
                                            member.lastName)}
                                    </p>
                                </div>
                            </div>
                            <p>{member.firstName} {member.lastName}</p>
                        </div>
                    })
                    }
                </div>
                <div className="add-team-members flex column">
                    <p className="uppercase"> add a team member </p>
                    {this.state.availableMembers.map(teamMember => {
                        return (
                            <div key={teamMember._id}
                                className="team-member flex align-center"
                                onClick={() => this.updateChoosenMembers(teamMember)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6', color: '#172b4d' }} >
                                    <div className="team-member-icon">
                                        <p>
                                            {utils.createUserIcon(teamMember.firstName,
                                                teamMember.lastName)}
                                        </p>
                                    </div>
                                </div>

                                <p>{teamMember.firstName} {teamMember.lastName}</p>
                            </div>
                        )
                    })}
                </div >
            </div >
        );
    }
}