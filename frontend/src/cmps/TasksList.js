import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import { updateBoard } from '../actions/BoardActions';

import TaskPreview from './TaskPreview';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';

class TasksList extends Component {

    state = {
        showAddForm: false,
        showEditForm: false,
        currTaskId: '',
        showTaskDetails: false
    }

    toggleUpdateForm = (id) => {
        if (id) {
            this.setState((prevState) => ({ showEditForm: !prevState.showEditForm, currTaskId: id }))
        } else {
            this.setState((prevState) => ({ showAddForm: !prevState.showAddForm }))
        }
    }

    onDelete = (id) => {
        let board = { ...this.props.board };
        let column = this.props.column;
        let taskIds = column.taskIds
        let idx = taskIds.findIndex(taskId => taskId === id);
        taskIds.splice(idx, 1);
        this.props.updateBoard(board);
    }

    toggleTaskDetails = id => {
        if(!id) id = this.state.currTaskId;
        this.setState(prevState => ({showTaskDetails: !prevState.showTaskDetails, currTaskId: id}));
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
                                    <NaturalDragAnimation
                                        style={provided.draggableProps.style}
                                        snapshot={snapshot}
                                        rotationMultiplier={1}
                                    >
                                        {style => (
                                            <div>
                                                {/* <div onClick={_ => this.toggleUpdateForm(task.id)}> */}
                                                <div onClick={_ => this.toggleTaskDetails(task.id)}>
                                                    <TaskPreview
                                                        provided={provided}
                                                        innerRef={provided.innerRef}
                                                        task={task}
                                                        isDragging={snapshot.isDragging}
                                                        style={style}
                                                    >
                                                    </TaskPreview>
                                                </div>
                                                {(this.state.showTaskDetails && this.state.currTaskId === task.id) && 
                                                    <TaskDetails
                                                    taskId={this.state.currTaskId}
                                                    board={this.props.board}
                                                    column={this.props.column}
                                                    updateBoard={this.props.updateBoard}
                                                    toggleTaskDetails={this.toggleTaskDetails}
                                                    />
                                                }
                                                {/* <div>
                                                    {(this.state.showEditForm && this.state.currTaskId === task.id) ?
                                                        <TaskForm
                                                            column={this.props.column}
                                                            task={task}
                                                            toggleUpdateForm={this.toggleUpdateForm}
                                                            updateBoard={this.props.updateBoard}
                                                        />
                                                        : ''}
                                                </div> */}
                                                <div onClick={() => this.onDelete(task.id)}>X</div>
                                            </div>
                                        )}
                                    </NaturalDragAnimation>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {provided.placeholder}
                    <div className="board-column-footer">
                        <p onClick={() => this.toggleUpdateForm('')}> + Add task </p>
                        {(this.state.showAddForm) &&
                            <TaskForm
                                board={this.props.board}
                                column={this.props.column}
                                toggleUpdateForm={this.toggleUpdateForm}
                                updateBoard={this.props.updateBoard} />
                        }
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