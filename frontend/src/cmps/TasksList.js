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
        showAddFormButton: true,
        currTaskId: ''
    }

    toggleUpdateForm = (id) => {
        if (id) {
            this.setState((prevState) => ({
                showEditForm: !prevState.showEditForm, currTaskId: id,
                showAddFormButton: !prevState.showAddFormButton
            }))
        } else {
            this.setState((prevState) => ({
                showAddForm: !prevState.showAddForm,
                showAddFormButton: !prevState.showAddFormButton
            }))
        }
    }

    onDelete = (ev, id) => {
        ev.stopPropagation();
        let board = { ...this.props.board };
        let column = this.props.column;
        let taskIds = column.taskIds
        let idx = taskIds.findIndex(taskId => taskId === id);
        taskIds.splice(idx, 1);
        this.setState({
            showAddFormButton: true,
            showEditForm: false
        }, () =>
            this.props.updateBoard(board)
        );
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
                                                onDelete={(ev) => this.onDelete(ev, task.id)}
                                            >
                                            </TaskPreview>
                                        </div>
                                        <div>
                                            {(this.state.showEditForm && this.state.currTaskId === task.id) ?
                                                <TaskForm column={this.props.column} task={task} toggleUpdateForm={this.toggleUpdateForm} />
                                                : ''}
                                        </div>
                                        {/* <div onClick={() => this.onDelete(task.id)}>X</div> */}
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {provided.placeholder}
                    <div className="board-column-footer">

                        {(this.state.showAddFormButton) ?
                            <p className="board-column-footer-add-task"
                                onClick={() => this.toggleUpdateForm('')}> + Add task </p>
                            : ''}

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