import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import DynamicComponent from './dynamics/DynamicComponent';

export default class TasksList extends Component {

    state = {
        showAddForm: false,
        currTaskId: '',
        onTaskId: '',
        showTaskDetails: false
    }

    onDelete = (id) => {
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

    showEditBtn = (id) => {
        this.setState({ showEditBtn: true, onTaskId: id })
    }

    hideEditBtn = () => {
        this.setState({ showEditBtn: false })
    }

    render() {
        const { tasks, provided, innerRef, isDraggingOver } = this.props;
        return (
            <section
                className={"task-list" + (isDraggingOver ? " isDraggingOver" : "")}
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
                                            rotationMultiplier={1.3}
                                        >
                                            {style => (
                                                <div onClick={_ => this.props.toggleTaskDetails({ id: task.id, column: this.props.column })}
                                                    onMouseEnter={() => this.showEditBtn(task.id)}
                                                    onMouseLeave={() => this.hideEditBtn()}
                                                >
                                                    <DynamicComponent
                                                        provided={provided}
                                                        innerRef={provided.innerRef}
                                                        task={task}
                                                        column={this.props.column}
                                                        isDragging={snapshot.isDragging}
                                                        style={style}
                                                        onTaskId={this.state.onTaskId}
                                                        showEditBtn={this.state.showEditBtn}
                                                        toggleMiniDetails = {this.props.toggleMiniDetails}
                                                    >
                                                    </DynamicComponent>
                                                </div>
                                            )}
                                        </NaturalDragAnimation>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div> 
            </section>
        )
    }
}