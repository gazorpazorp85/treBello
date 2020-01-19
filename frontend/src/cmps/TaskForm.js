import React, { Component } from 'react';

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
            creator: {},
            taskTeamMembers: []
        }
    }

    componentDidMount() {
        this.setFormDataForEdit();
        // console.log('props', this.props)
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
                    creator: task.creator,
                    taskTeamMembers: task.taskTeamMembers
                }
            })
        }
    }

    inputChange = (ev) => {
        const fieldName = ev.target.name;
        const value = ev.target.value;
        this.setState({ task: { ...this.state.task, [fieldName]: value } })
    }

    saveTask = (ev) => {
        ev.preventDefault();
        this.setState(prevState => ({ task: { ...prevState.task, description: this.props.description } }), _ => {
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
            this.props.updateBoard(newBoard);
            this.props.toggleTaskDetails();
        });
    }

    render() {
        return <div>
            <form onSubmit={this.saveTask}>
                <input type='text' placeholder='task title' name='title'
                    onChange={this.inputChange} value={this.state.task.title} />
                <input type='datetime-local' placeholder='task Name' name='dueDate'
                    onChange={this.inputChange} value={this.state.task.dueDate} />
                <div>Importance:
                    <select name='importance' value={this.state.task.importance} onChange={this.inputChange}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <div>Labels:
                </div>
                <button>Save</button>
            </form>
        </div>
    }
}
