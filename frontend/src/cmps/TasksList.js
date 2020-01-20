import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import TaskPreview from './TaskPreview';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';

export default class TasksList extends Component {

    state = {
        showAddForm: false,
        showEditForm: false,
        showEditBtn: false,
        currTaskId: '',
        showTaskDetails: false
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

    toggleTaskDetails = id => {
        if (id) {
            this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails, currTaskId: id }));
        } else {
            this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails }));
        }

    }

    canOpenTaskDetails = taskId => {
        return (this.state.showTaskDetails && this.state.currTaskId === taskId)
    }

    showEditBtn = () => {
        this.setState({ showEditBtn: true })
    }

    hideEditBtn = () => {
        this.setState({ showEditBtn: false })
    }

    render() {
        const { tasks, provided, innerRef, isDraggingOver } = this.props;
        return (
            <section
                className={"board-column" + (isDraggingOver ? " isDraggingOver" : "")}
                {...provided.droppableProps}
                ref={innerRef}
            >
                {(Object.keys(tasks).length !== 0) ? 
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
                                                <div onClick={_ => this.toggleTaskDetails(task.id)}>
                                                    <TaskPreview
                                                        // onMouseEnter={this.showEditBtn}
                                                        // onMouseLeave={this.hideEditBtn}
                                                        provided={provided}
                                                        innerRef={provided.innerRef}
                                                        task={task}
                                                        isDragging={snapshot.isDragging}
                                                        style={style}
                                                        onDelete={(ev) => this.onDelete(ev, task.id)}
                                                        // showEditBtn={this.showEditBtn}
                                                    >
                                                    </TaskPreview>
                                                </div>
                                                {this.canOpenTaskDetails(task.id) &&
                                                    <TaskDetails
                                                        taskId={this.state.currTaskId}
                                                        board={this.props.board}
                                                        column={this.props.column}
                                                        updateBoard={this.props.updateBoard}
                                                        toggleTaskDetails={this.toggleTaskDetails}
                                                    />
                                                }
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
                                updateBoard={this.props.updateBoard}
                                toggleTaskDetails={this.toggleTaskDetails}
                            />
                        }
                    </div>
                </div> :
                <div className="board-column-footer">
                        <p onClick={() => this.toggleUpdateForm('')}> + Add task </p>
                        {(this.state.showAddForm) &&
                            <TaskForm
                                board={this.props.board}
                                column={this.props.column}
                                toggleUpdateForm={this.toggleUpdateForm}
                                updateBoard={this.props.updateBoard}
                                toggleTaskDetails={this.toggleTaskDetails}
                            />
                        }
                </div>}
            </section>
        )
    }
}