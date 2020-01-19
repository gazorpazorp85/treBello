import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions'
import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils'

class TaskForm extends Component {

    state = {
        task: {
            id: utils.getRandomId(),
            title: '',
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
                    title: task.title,
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
        let id = this.props.column.id;
        let idx = board.columns.findIndex(column => column.id === id);
        let column = board.columns[idx];
        let taskId = this.state.task.id;
        let tasksIdx = column.tasks.findIndex(task => task.id === taskId);
        (tasksIdx === -1) ? column.tasks.push(this.state.task) :
            column.tasks.splice(tasksIdx, 1, this.state.task);
        this.props.updateBoard(board);
        this.props.toggleUpdateForm();
    }

    render() {
        return <div className="task-form" >
            <form onSubmit={this.saveTask}>
                <div className="flex column" >

                    <textarea type="text" placeholder="+ Add a title for this card..." name="title"
                        onChange={this.inputChange} value={this.state.task.title} />
                    {/* <input type='datetime-local' placeholder='task Name' name='dueDate'
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
                </div> */}
                    <button className="task-form-save-btn">SAVE</button>
                    <CloseIcon />
                </div>
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