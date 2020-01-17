import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions';

import TaskPreview from './TaskPreview';
import TaskForm from './TaskForm';

class TasksList extends Component {

    state = {
        showAddForm: false,
        showEditForm: false,
        currTaskId: ''
    }

    toggleUpdateForm = (id) => {
        if (id) {
            this.setState({ currTaskId: id });
            this.setState((prevState) => ({ showEditForm: !prevState.showEditForm }))
        } else {
            this.setState((prevState) => ({ showAddForm: !prevState.showAddForm }))
        }
    }

    onDelete = (id) => {
        let board = { ... this.props.board };
        let column = this.props.column;
        let filteredTasks = column.tasks.filter(task => task.id !== id);
        column.tasks = filteredTasks;
        this.props.updateBoard(board);
    }

    render() {
        return (
            <section className="board-column">
                <div>
                    {this.props.tasks.map(task => (
                        <div key={task.id}>
                            <div onClick={() => this.toggleUpdateForm(task.id)}>
                                <TaskPreview task={task} />
                            </div>
                            <div>
                                {(this.state.showEditForm && this.state.currTaskId === task.id) ?
                                    <TaskForm column={this.props.column} task={task} toggleUpdateForm={this.toggleUpdateForm} />
                                    : ''}
                            </div>
                            <div onClick={() => this.onDelete(task.id)}>X</div>
                        </div>
                    ))}
                    <div className="board-column-footer">
                        <p onClick={() => this.toggleUpdateForm('')}> + Add task </p>
                        {(this.state.showAddForm) ? <TaskForm column={this.props.column} toggleUpdateForm={this.toggleUpdateForm} /> : ''}
                    </div>
                </div>
            </section>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);