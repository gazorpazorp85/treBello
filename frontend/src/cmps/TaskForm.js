import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils'

export default class TaskForm extends Component {

    state = {
        task: {
            id: utils.getRandomId(),
            title: '',
            createdAt: Date.now(),
            dueDate: '',
            importance: '',
            description: '',
            type: 'text',
            labels: [],
            todos: [],
            taskTeamMembers: []
        },
        edit: false
    }

    componentDidMount() {
        this.nameInput.focus();
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.task !== this.props.task) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        if (this.props.task) {
            const task = this.props.task;
            this.setState({
                task: {
                    id: task.id,
                    title: task.title,
                    createdAt: task.createdAt,
                    dueDate: task.dueDate,
                    importance: task.importance,
                    description: this.props.description,
                    type: task.type,
                    labels: task.labels,
                    todos: task.todos,
                    taskTeamMembers: task.taskTeamMembers
                },
                edit: true
            })
        }
    }

    inputChange = (ev) => {
        const fieldName = ev.target.name;
        const value = ev.target.value;
        this.setState({ task: { ...this.state.task, [fieldName]: value } })
    }

    save = (ev) => {
        ev.preventDefault();
        this.checkIfUrlAndSave(this.state.task.title);
    }

    checkIfUrlAndSave = (url) => {
        const youtubeREGEX = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const imgREGEX = /.(jpg|jpeg|png|gif)\/?$/;
        if (url.match(youtubeREGEX)) {
            const newUrl = url.replace('watch?v=', 'embed/');
            return this.setState(prevState => ({ task: { ...prevState.task, title: '', type: 'video', url: newUrl } }), _ => {
                this.saveTask();
            });
        } else if (url.match(imgREGEX)) {
            return this.setState(prevState => ({ task: { ...prevState.task, title: '', type: 'image', url } }), _ => {
                this.saveTask();
            });
        }
        this.saveTask();
    }

    saveTask = _ => {
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [this.state.task.id]: this.state.task
            }
        };
        const column = this.props.column;
        const id = this.state.task.id;
        if (!column.taskIds.includes(id)) column.taskIds.push(id);
        const msg = (!this.state.edit) ?
            `The task '${this.state.task.title}' was added by ${this.props.user}` :
            `${this.props.user} edited the task '${this.state.task.title}'`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.closeUpdateForm();
        if (this.props.toggleUpdateForm) this.props.toggleUpdateForm();
        if (this.props.toggleTaskDetails) this.props.toggleTaskDetails();
    }

    textAreaAdjust = ev => {
        ev.target.style.height = "1px"
        ev.target.style.height = (25 + ev.target.scrollHeight) + "px";
    }

    render() {
        return <div className="task-form" >
            <form onSubmit={this.save} onClick={ev => ev.stopPropagation()}>
                <div className="flex column" >

                    <textarea type="text"
                        onKeyUp={this.textAreaAdjust}
                        placeholder="Enter a title for this card..."
                        name="title"
                        ref={(input) => { this.nameInput = input; }}
                        onChange={this.inputChange} value={this.state.task.title} />
                    <div className="save-btn-container flex align-center">
                        <button className="task-form-save-btn save capitalize">add card</button>
                        <CloseIcon className="task-form-back-btn" onClick={(ev) => { ev.stopPropagation(); this.props.closeUpdateForm() }} />
                    </div>
                </div>
            </form>
        </div>
    }
}
