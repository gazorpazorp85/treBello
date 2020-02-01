import React, { Component } from 'react';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
//icons :

import NotesIcon from '@material-ui/icons/Notes';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import DueDate from './DueDate';
import Labels from './Labels';
import Members from './Members';
import Todos from './Todos';

import utils from '../services/utils'

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
        toggleDeleteTodo: false,
        progressWidth: 0,
        currTodoId: '',
        taskTitle: ''
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
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.toggleTaskDetails();
    }

    onDeleteTask = (column, task) => {
        const board = { ...this.props.board };
        const taskIds = column.taskIds;
        const idx = taskIds.findIndex(taskId => taskId === task.id);
        taskIds.splice(idx, 1);
        delete board.tasks[task.id];
        const msg = `'${task.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger';
        this.props.updateBoard(board, msg, notificationType);
        this.props.toggleTaskDetails();
    }

    toggleTodoDone = async (todo) => {
        todo.isDone = !todo.isDone;
        let newTask = { ...this.props.board.tasks[this.props.taskId] };
        const todos = newTask.todos;
        const idx = todos.findIndex(currTodo => (currTodo.id === todo.id));
        todos[idx].isDone = todo.isDone;
        let msg = '';
        let notificationType = '';
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        if (todo.isDone) {
            msg = `The subtask '${todo.text}' in '${newTask.title}' was completed by ${this.props.user}`;
            notificationType = 'success';
        } else {
            msg = `The subtask '${todo.text}' in '${newTask.title}' was remarked as uncompleted by ${this.props.user}`;
            notificationType = 'danger';
        }
        this.props.updateBoard(newBoard, msg, notificationType);
        this.updateProgressBar()
    }

    updateProgressBar = () => {
        let start = this.state.progressWidth;
        let task = this.props.board.tasks[this.props.taskId];
        let doneTodosCounter = task.todos.filter(todo => (todo.isDone)).length;
        task.todosDone = doneTodosCounter;

        let interval;
        let progressWidth = Math.round((doneTodosCounter / task.todos.length) * 100);
        if (!progressWidth && !start) return;
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
        const idx = todos.findIndex(currTodo => (currTodo.id === todoId));
        const deletedTodo = todos[idx];
        todos.splice(idx, 1);
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [task.id]: task
            }
        }
        const msg = `The subtask '${deletedTodo.text}' in '${task.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.updateProgressBar();
        this.hideDeleteTodoButton(todoId);
    }

    showDeleteTodoButton = (todoId) => {
        this.setState({ toggleDeleteTodo: true, currTodoId: todoId });
    }

    hideDeleteTodoButton = (todoId) => {
        this.setState({ toggleDeleteTodo: false, currTodoId: todoId });
    }

    setTaskName = (taskId) => {
        const taskTitle = this.props.board.tasks[taskId].title;
        this.setState({ taskTitle: taskTitle });
    }

    emitChange = (ev) => {
        this.setState({ taskTitle: ev.target.innerText });
    }

    saveTaskName = (taskId, title) => {
        const taskTitle = this.props.board.tasks[taskId].title;
        if (taskTitle === title) return;

        const updatedBoard = { ...this.props.board };
        updatedBoard.tasks[taskId].title = title;

        const msg = `${this.props.user} changed the title of the task '${taskTitle}' to '${title}'`;
        const notificationType = 'success';
        this.props.updateBoard(updatedBoard, msg, notificationType);
    }

    render() {
        const task = this.props.board.tasks[this.props.taskId];
        const { column } = this.props;
        return (
            <div className="screen flex align-center justify-center" onClick={() => this.props.toggleTaskDetails()}>
                <div className="task-details-container-wrapper flex" onClick={(ev) => this.onStopPropagationAndCloseOptions(ev)}>
                    <div className="task-details-container flex">
                        <CloseIcon className="add-column-back-to-board   flex align-center"
                            onClick={() => this.props.toggleTaskDetails()} />
                        <div className="task-details-container-main full">
                            <header className="task-details-container-header">
                                <DescriptionOutlinedIcon style={{
                                    color: '#42526e', position: 'absolute',
                                    top: '10px',
                                    left: '12px'
                                }} />
                                <h2
                                    contentEditable='true'
                                    spellCheck="false"
                                    onFocus={() => this.setTaskName(task.id)}
                                    onInput={(ev) => this.emitChange(ev)}
                                    onBlur={() => this.saveTaskName(task.id, this.state.taskTitle)}
                                    suppressContentEditableWarning={true}
                                >{task.title}</h2>
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
                                        user={this.props.user}
                                        task={task}
                                        updateBoard={this.props.updateBoard}
                                        updateProgressBar={this.updateProgressBar}
                                    /> : ''
                                }
                                <AssignmentTurnedInOutlinedIcon
                                    style={{
                                        color: '#42526e',
                                        position: 'relative',
                                        top: '35px',
                                        right: '44px',
                                    }}
                                />
                                <h2>Checklist</h2>

                                {task.todos ?
                                    <div className="check-list-container flex column">
                                        {task.todos.map(todo => {
                                            return <div key={todo.id} className="todo-item flex align-center space-between" onMouseEnter={() => this.showDeleteTodoButton(todo.id)}
                                                onMouseLeave={() => this.hideDeleteTodoButton(todo.id)}>
                                                <div className="flex align-center">
                                                    <input type="checkbox" onChange={() => this.toggleTodoDone(todo)} checked={todo.isDone ? 'checked' : ''}>
                                                    </input>
                                                    <p className={todo.isDone ? "text-decoration" : ""}>
                                                        {todo.text}
                                                    </p>
                                                </div>
                                                <DeleteOutlineIcon
                                                    onClick={() => this.deleteTodo(todo.id)}
                                                    className="pointer delete-btn"
                                                    style={{ display: this.state.toggleDeleteTodo && this.state.currTodoId === todo.id ? 'block' : 'none' }}
                                                />
                                            </div>
                                        })
                                        }
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
                                    updateProgressBar={this.updateProgressBar}

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
                        </div>

                        <div className="task-details-container-overall-options">
                            <div className="task-details-container-add-to-card-options container">
                                <h3 className="uppercase" style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.04em'
                                }}>add to card</h3>
                                <div className="task-details-container-add-to-card-options flex column">
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleChooseLabels(ev)}>
                                        <LabelOutlinedIcon />
                                        <p className="capitalize" >labels</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleChooseMembers(ev)} >
                                        <PersonAddOutlinedIcon />
                                        <p className="capitalize">members</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleTodos(ev)} >
                                        <AssignmentTurnedInOutlinedIcon />
                                        <p className="capitalize">check list</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.onToggleDueDate(ev)}>
                                        <EventOutlinedIcon />
                                        <p className="capitalize">due date</p>
                                    </div>
                                </div>
                            </div>

                            <div className="task-details-container-actions-options container">
                                <h3 className="uppercase" style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.04em'
                                }}>actions</h3>
                                <div className="task-details-container-actions-options-btn flex align-center" onClick={() => this.onDuplicateTask(column, task)}>
                                    <FileCopyIcon />
                                    <p className="capitalize">duplicate</p>
                                </div>
                                <div className="task-details-container-actions-options-btn flex align-center" onClick={() => this.onDeleteTask(column, task)}>
                                    <DeleteIcon />
                                    <p className="capitalize">delete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>

        )
    }
}


