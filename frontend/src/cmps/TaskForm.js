import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions'

import utils from '../services/utils'

class TaskForm extends Component {

    state = {
        task: {
            id: utils.getRandomId(),
            content: '',
            createdAt: Date.now(),
            dueDate: '',
            importance: '',
            labels: [],
            creator: {},
            taskTeamMembers: []
        }
    }

    componentDidMount() {
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.task !== this.props.task) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        const task = this.props.task;
        if (task) {
            this.setState({
                task: {
                    id: task.id,
                    content: task.content,
                    createdAt: task.createdAt,
                    dueDate: task.dueDate,
                    importance: task.importance,
                    labels: task.labels,
                    creator: task.creator,
                    taskTeamMembers: task.taskTeamMembers
                }
            })
        }
    }

    inputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState({ task: { ...this.state.task, [fieldName]: value } })
    }

    saveTask = (ev) => {
        ev.preventDefault();
        let board = { ...this.props.board };
        let column = this.props.column;
        let task = this.state.task;
        let id = task.id;
        board.tasks[id] = task;
        if (!column.taskIds.includes(id)) column.taskIds.push(id);
        this.props.updateBoard(board);
        this.props.toggleUpdateForm();
    }

    render() {
        return <div>
            <form onSubmit={this.saveTask}>
                <input type='text' placeholder='task content' name='content'
                    onChange={this.inputChange} value={this.state.task.content} />
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

const mapStateToProps = state => {
    return {
        board: state.boards.board
    };
};

const mapDispatchToProps = {
    updateBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);