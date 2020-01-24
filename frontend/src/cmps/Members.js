import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils'

export default class Members extends Component {
    state = {
        choosenMembers: [],
        availableMembers: []
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        // const availableMembers = this.props.board.teamMembers.filter(currMember => !this.props.task.taskTeamMembers.find(taskMember => taskMember.userName === currMember.userName));
        // this.setState({ choosenMembers: this.props.task.taskTeamMembers, availableMembers }, _ => console.log(this.state));
        this.setState({ choosenMembers: this.props.task.taskTeamMembers });
    }

    updateChoosenMembers = (teamMember) => {
        const member = teamMember;
        const choosenMembers = this.state.choosenMembers;
        const memberIdx = choosenMembers.findIndex(currMember => currMember.userName === member.userName);
        if (memberIdx >= 0) {
            choosenMembers.splice(memberIdx, 1)
        } else {
            choosenMembers.push(member);
        }
        this.setState({ choosenMembers }, this.onSave);
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
                style={{ ...updateStyle }}
            >
                <CloseIcon className="members-container-close-btn" onClick={this.props.toggleChooseMembers} />
                <p>ASIGN MEMBERS</p>
                <hr />
                <div className="members-container-colors-container flex column">
                    {this.props.task.taskTeamMembers.map(member => {
                        return <div key={member.userName} className="team-member flex">
                            <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: `${member.color}` }} >
                                <div className="team-member-icon">
                                    <p>
                                        {utils.createUserIcon(member.firstName,
                                            member.lastName)}
                                    </p>
                                </div>
                            </div>
                            <p>{member.firstName}</p>
                            <p>{member.lastName}</p>
                        </div>
                    })
                    }
                </div>
                <div className="add-team-members flex column">
                    <p> ADD A TEAM MEMBER </p>





                    {/* {this.state.availableMembers.map(teamMember => { */}
                    {this.props.board.teamMembers.map(teamMember => {
                        return <div key={teamMember.userName}
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

                            <p>{teamMember.firstName}</p>
                            <p>{teamMember.lastName}</p>
                        </div>
                    })
                    }
                </div >
            </div >
        );

    }
}
