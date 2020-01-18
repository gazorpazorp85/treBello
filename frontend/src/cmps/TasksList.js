import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'
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
            this.setState((prevState) => ({ showEditForm: !prevState.showEditForm, currTaskId: id }))
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
        const { tasks, provided, innerRef, isDraggingOver } = this.props;
        return (
            <section
                className={"board-column" + (isDraggingOver ? " isDraggingOver" : "")}
                {...provided.droppableProps}
                ref={innerRef}
            >
                <div>
                    {tasks.map((task, idx) => (
                        <div key={task.id}>
                            <Draggable draggableId={task.id} index={idx}>
                                {(provided, snapshot) => (
                                    <div>
                                        <div onClick={() => this.toggleUpdateForm(task.id)}>
                                            <TaskPreview
                                                provided={provided}
                                                innerRef={provided.innerRef}
                                                task={task}
                                                isDragging={snapshot.isDragging}
                                            >
                                            </TaskPreview>
                                        </div>
                                        <div>
                                            {(this.state.showEditForm && this.state.currTaskId === task.id) ?
                                                <TaskForm column={this.props.column} task={task} toggleUpdateForm={this.toggleUpdateForm} />
                                                : ''}
                                        </div>
                                        <div onClick={() => this.onDelete(task.id)}>X</div>
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {provided.placeholder}
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