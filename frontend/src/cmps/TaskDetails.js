import React, { Component } from 'react';
import moment from 'moment';

import TitleIcon from '@material-ui/icons/Title';
import NotesIcon from '@material-ui/icons/Notes';
// import ListAltIcon from '@material-ui/icons/ListAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';
import LabelIcon from '@material-ui/icons/Label';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EventIcon from '@material-ui/icons/Event';
import Avatar from '@material-ui/core/Avatar';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';

import DueDate from './DueDate';
import Labels from './Labels';
import Members from './Members';
import Todos from './Todos';


import utils from '../services/utils'
import TaskList from './Todos';

export default class TaskDetails extends Component {
    state = {
        deuDate: null,
        description: '',
        teamMembers: [],
        choosenMembers: [],
        choosenlabels: [],
        showActivity: false,
        showEditDescriptionForm: false,
        toggleChooseLabels: false,
        toggleChooseMembers: false,
        toggleTodos: false,
        onToggleDueDate: false,
        progressWidth: 0
    }

    componentDidMount() {
        let currTask = this.props.board.tasks[this.props.taskId]
        this.setState({ description: currTask.description }, this.updateProgressBar);
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

    toggleTodos = (ev) => {
        ev.stopPropagation();
        this.setState(prevState => ({ toggleTodos: !prevState.toggleTodos }))
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

    toggleTodoDone = (todo) => {
        todo.isDone = !todo.isDone;
        let newTask = { ...this.props.board.tasks[this.props.taskId] };
        const todos = newTask.todos;
        const idx = todos.findIndex(currTodo => (currTodo.id === todo.id))
        todos[idx].isDone = todo.isDone;
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
        this.updateProgressBar()
    }

    updateProgressBar = () => {
        let start = this.state.progressWidth;
        const task = this.props.board.tasks[this.props.taskId];
        let doneTodosCounter = task.todos.filter(todo => (todo.isDone)).length;
        let interval;
        let progressWidth = Math.round((doneTodosCounter / task.todos.length) * 100);
        //     if (start <= progressWidth) {
        //         clearInterval(interval);
        //     } else {
        //         interval = setInterval(() => {
        //             start--;
        //             this.setState({ progressWidth: start })
        //         }, 10)
        //     };
        // }
        if (start < progressWidth) {
            interval = setInterval(() => {
                if (start >= progressWidth) {
                    clearInterval(interval);
                } else {
                    start++;
                    this.setState({ progressWidth: start })
                }
            }, 10);
        } else {
            interval = setInterval(() => {
                if (start <= progressWidth) {
                    clearInterval(interval);
                } else {
                    start--;
                    this.setState({ progressWidth: start })
                }
            }, 10);
        }
    }

    deleteTodo = (todoId) => {
        let task = this.props.board.tasks[this.props.taskId];
        let todos = task.todos;
        const idx = todos.findIndex(currTodo => (currTodo.id === todoId))
        todos.splice(idx, 1);
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [task.id]: task
            }
        }
        this.props.updateBoard(newBoard);
        this.updateProgressBar()
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
                            <DescriptionOutlinedIcon style={{
                                color: '#42526e', position: 'absolute',
                                top: '22px',
                                left: '12px'
                            }} />
                            <h2>{task.title}</h2>
                            <div className="task-details-container-in-list flex">
                                <p>in list <span style={{ textDecoration: "underline" }}>{column.title}</span></p>
                            </div>
                        </header>

                        <div className="chosen-labels-container">
                            {this.state.toggleChooseLabels ?
                                <Labels
                                    toggleChooseLabels={this.toggleChooseLabels}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                /> : ''
                            }
                            {task.labels.length !== 0 && <h3 className="uppercase" style={{
                                fontSize: '.75rem',
                                fontWeight: 500,
                                letterSpacing: '.04em',
                            }}>Labels</h3>}
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
                            {task.taskTeamMembers.length !== 0 && <h3 className="uppercase" style={{
                                fontSize: '.75rem',
                                fontWeight: 500,
                                letterSpacing: '.04em'
                            }}>members</h3>}
                            <div className="flex">
                                {
                                    task.taskTeamMembers.map(member => {
                                        return <Avatar key={member._id} style={{
                                            backgroundColor: '#dfe1e6',
                                            height: 28,
                                            width: 28,
                                            fontSize: '0.85rem',
                                            margin: '4px 4px 4px 0',
                                            color: '#172b4d',
                                            fontWeight: 600,
                                            textAlign: 'center'
                                        }}>
                                            {utils.createUserIcon(member.firstName,
                                                member.lastName)}
                                        </Avatar>

                                    })
                                }
                            </div>
                        </div>
                        <div className="task-details-container-check-list-container">
                            {this.state.toggleTodos ?
                                <Todos
                                    toggleTodos={this.toggleTodos}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                /> : ''
                            }
                            <AssignmentTurnedInOutlinedIcon style={{
                                color: '#42526e', 
                                position: 'relative',
                                top: '35px',
                                right: '44px'
                            }} />
                            <h2>Checklist</h2>

                            {task.todos ?
                                <div className="check-list-container flex column">
                                    {task.todos.map(todo => {
                                        console.log('im here task todo: ', task.todos.length)
                                        return <div key={todo.id} className="todo-item flex space-between" >
                                            <div className="flex align-center">
                                                <input type="checkbox" onChange={() => this.toggleTodoDone(todo)} {todo.isDone ? checked : ''}>
                                                </input>
                                                <p className={todo.isDone ? "text-decoration" : ""}>
                                                    {todo.text}
                                                </p>
                                            </div>
                                            <DeleteOutlineIcon
                                                onClick={() => this.deleteTodo(todo.id)}
                                            />
                                        </div>
                                    })
                                    }
                                    {console.log('im here')}
                                    <div className="check-list-progress">
                                        <div className="progress fill-height flex align-center" style={{ width: this.state.progressWidth + "%" }} >
                                            <small className="fill-width text-center">{this.state.progressWidth + "%"}</small>
                                        </div>
                                    </div>
                                </div> : ''
                            }
                        </div>
                        <div className="task-details-container-duedate-container">
                            <EventOutlinedIcon style={{
                                color: '#42526e', position: 'relative',
                                top: '35px',
                                right: '44px'
                            }} />
                            <h2>Due Date</h2>
                            {(task.dueDate) ?
                                <p>{moment(task.dueDate).format("MMMM Do YYYY, hh:mm a")}</p> :
                                <p>This task doesn't have a due date yet</p>
                            }
                            {this.state.onToggleDueDate ? <DueDate
                                task={task}
                                onToggle={this.onToggleDueDate}
                                board={this.props.board}
                                updateBoard={this.props.updateBoard}
                                user={this.props.user}
                            /> : ''}
                        </div>

                        <div className="task-details-container-description">
                            <NotesIcon style={{
                                color: '#42526e', position: 'relative',
                                top: '35px',
                                right: '44px'
                            }} />
                            <h2>Description</h2>
                            <form onSubmit={this.save} onClick={this.toggleUpdateDescriptionForm}>
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
                            <h3 className="uppercase" style={{
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                letterSpacing: '0.04em'
                            }}>add to card</h3>
                            <div className="task-details-container-add-to-card-options flex column">
                                <div className="task-details-container-add-to-card-options-btn btn" onClick={ev => this.toggleChooseLabels(ev)} >Labels</div>
                                <div className="task-details-container-add-to-card-options-btn btn" onClick={ev => this.toggleChooseMembers(ev)} >Members</div>
                                <div className="task-details-container-add-to-card-options-btn btn" onClick={ev => this.toggleTodos(ev)} >Check List</div>
                                <div className="task-details-container-add-to-card-options-btn btn" onClick={ev => this.onToggleDueDate(ev)}>Due date</div>
                                {/* <button className="task-details-container-add-to-card-options-btn btn" >Image</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Video</button> */}
                            </div>
                        </div>

                        <div className="task-details-container-actions-options-container">
                            <h3 className="uppercase" style={{
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                letterSpacing: '0.04em'
                            }}>actions</h3>
                            <div className="task-details-container-actions-options-btn btn" onClick={() => this.onDuplicateTask(column, task)}>Duplicate</div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


