import React, { Component } from 'react';
import moment from 'moment';

import TitleIcon from '@material-ui/icons/Title';
import NotesIcon from '@material-ui/icons/Notes';
// import ListAltIcon from '@material-ui/icons/ListAlt';
import CloseIcon from '@material-ui/icons/Close';
import LabelIcon from '@material-ui/icons/Label';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EventIcon from '@material-ui/icons/Event';

import DueDate from './DueDate';
import Labels from './Labels';
import Members from './Members';

import utils from '../services/utils'

export default class TaskDetails extends Component {
    state = {
        description: '',
        showActivity: false,
        showEditDescriptionForm: false,
        teamMembers: [],
        deuDate: null,
        toggleChooseLabels: false,
        choosenlabels: [],
        onToggleDueDate: false,
        toggleChooseMembers: false,
        choosenMembers: []

    }

    componentDidMount() {
        this.setState({ description: this.props.board.tasks[this.props.taskId].description });
    }

    emitChange = (ev) => {
        const targetValue = ev.target.value;
        this.setState({ description: targetValue });
    }

    toggleUpdateDescriptionForm = () => {
        this.setState(prevState => ({ showEditDescriptionForm: !prevState.showEditDescriptionForm }))
    }

    onToggleDueDate = ev => {
        ev.stopPropagation();
        this.setState(prevState => ({ onToggleDueDate: !prevState.onToggleDueDate }));
    }


    closeUpdateDescriptionForm = () => {
        this.setState({ toggleUpdateDescriptionForm: false })
    }

    onStopPropagationAndCloseOptions = (ev) => {
        ev.stopPropagation();
        this.setState({
            toggleChooseLabels: false,
            toggleChooseMembers: false
        })
    }

    toggleChooseLabels = (ev) => {
        ev.stopPropagation();
        this.setState(prevState => ({ toggleChooseLabels: !prevState.toggleChooseLabels }))
    }

    onSaveDescription = (task) => {
        const newTask = { ...task, description: this.state.description };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `The description of '${task.title}' was changed by ${this.props.user}`;
        const notificationType = 'success';
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() })
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    toggleChooseMembers = (ev) => {
        ev.stopPropagation();
        this.setState(prevState => ({ toggleChooseMembers: !prevState.toggleChooseMembers }))
    }

    onDuplicateTask = (column, task) => {
        const newTask = { ...task, id: utils.getRandomId() };
        column.taskIds.push(newTask.id);
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `The task '${task.title}' was duplicated by ${this.props.user}`;
        const notificationType = 'success';
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() })
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.toggleTaskDetails();
    }


    render() {
        const task = this.props.board.tasks[this.props.taskId];
        const { column } = this.props;
        return (
            <div className="screen flex align-center justify-center" onClick={() => this.props.toggleTaskDetails()}>

                <div className="task-details-container flex" onClick={(ev) => this.onStopPropagationAndCloseOptions(ev)}>
                    <CloseIcon className="add-column-back-to-board   flex align-center"
                        onClick={() => this.props.toggleTaskDetails()} />
                    <div className="task-details-container-main full">
                        <header className="task-details-container-header">
                            <div className="flex align-center">
                                <TitleIcon />
                                <h2>{task.title}</h2>
                            </div>
                            <div className="task-details-container-in-list flex">
                                <p className="flex">in list "{column.title}"</p>
                            </div>
                        </header>

                        <div className="task-details-container-labels-container">

                            {this.state.toggleChooseLabels ?
                                <Labels
                                    toggleChooseLabels={this.toggleChooseLabels}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                /> : ''
                            }
                            <div className="flex align-center">
                                <LabelIcon />
                                <h2>Labels :</h2>
                            </div>
                            <div className="labels-choosen-container flex">

                                {
                                    task.labels.map(label => {
                                        return <div key={label} className={label + ' medium-label'}>
                                        </div>
                                    })
                                }
                            </div>
                        </div>


                        <div className="task-details-container-members-container">

                            {this.state.toggleChooseMembers ?
                                <Members
                                    toggleChooseMembers={this.toggleChooseMembers}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                    users={this.props.users}
                                /> : ''
                            }
                            <div className="flex align-center">
                                <EmojiPeopleIcon />
                                <h2>Team Members :</h2>
                            </div>

                            <div className="members-choosen-container flex column">
                                {
                                    task.taskTeamMembers.map(member => {
                                        return <div key={member._id} className="flex">
                                            <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: `${member.color}` }} >
                                                <div className="team-member-icon flex align-center">
                                                    <p>
                                                        {utils.createUserIcon(member.firstName,
                                                            member.lastName)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className=" flex align-center">{member.firstName}</p>
                                            <p className=" flex align-center"> {member.lastName}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="task-details-container-duedate-container">
                            <div className="flex align-center">
                                <EventIcon />
                                <h2>Due Date :</h2>
                            </div>
                            <div>
                                {(task.dueDate) ?
                                    <p>{moment(task.dueDate).calendar()}</p> :
                                    <p>This task doesn't have a due date yet</p>
                                }
                            </div>
                            {this.state.onToggleDueDate ? <DueDate
                                task={task}
                                onToggle={this.onToggleDueDate}
                                board={this.props.board}
                                updateBoard={this.props.updateBoard}
                                user={this.props.user}
                            /> : ''}
                        </div>

                        <div className="task-details-container-main-description">
                            <div className="flex align-center">
                                <NotesIcon />
                                <h2>Description</h2>
                            </div>
                            <div className="flex column text-area-wrapper" onClick={this.toggleUpdateDescriptionForm}>
                                <form onSubmit={this.save}>
                                    <textarea className="fill-width"
                                        name="description"
                                        rows="3"
                                        cols="40"
                                        onInput={this.emitChange}
                                        defaultValue={task.description}
                                        spellCheck="false"
                                        placeholder="Add a more detailed description...">
                                    </textarea>
                                </form>
                                {this.state.showEditDescriptionForm ?
                                    <div className="flex align-center">
                                        <button className="task-form-save-btn uppercase" onClick={() => this.onSaveDescription(task)}>save</button>
                                        <CloseIcon className="task-form-back-btn" onClick={this.closeUpdateDescriptionForm} />
                                    </div> : ''
                                }
                            </div>
                        </div>

                        {/* <div className="task-details-container-main-activity flex space-between">
                            <div className="flex align-center">
                                <ListAltIcon />
                                <h2>Activity</h2>

                            </div>
                            <button>{this.state.showActivity ? 'Show Activity' : 'Hide Activity'}</button>
                        </div> */}
                    </div>

                    <div className="task-details-container-overall-options">
                        <div className="task-details-container-add-to-card-options-container">
                            <p className="text-center uppercase">add to card</p>
                            <div className="task-details-container-add-to-card-options flex column">

                                <button className="task-details-container-add-to-card-options-btn btn" onClick={(ev) => this.toggleChooseLabels(ev)} >Labels</button>
                                <button className="task-details-container-add-to-card-options-btn btn" onClick={(ev) => this.toggleChooseMembers(ev)} >Members</button>
                                {/* <button className="task-details-container-add-to-card-options-btn btn" >Check List</button> */}
                                <button className="task-details-container-add-to-card-options-btn btn" onClick={ev => this.onToggleDueDate(ev)}>Due Date</button>
                                {/* <button className="task-details-container-add-to-card-options-btn btn" >Image</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Video</button> */}
                            </div>
                        </div>

                        <div className="task-details-container-actions-options-container">
                            <p className="text-center uppercase">actions</p>
                            <div className="task-details-container-actions-options-actions flex column">
                                <button className="task-details-container-actions-options-btn btn" onClick={() => this.onDuplicateTask(column, task)}>Duplicate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


