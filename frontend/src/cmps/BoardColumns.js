import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

// import AddIcon from '@material-ui/icons/Add';

import TopMenuOptions from './TopMenuOptions'
import TasksList from './TasksList';
import TaskForm from '../cmps/TaskForm'

export default class BoardColumns extends Component {
    state = {
        timer: null,
        title: ''
    }

    onDelete = (id) => {
        const board = { ...this.props.board };
        const columnOrder = board.columnOrder;
        const column = board.columns[id];
        for (const taskId of column.taskIds) {
            for (const taskKey in board.tasks) {
                if (taskId === taskKey) {
                    delete board.tasks[taskKey];
                }
            }
        }
        delete board.columns[id];
        const idx = columnOrder.findIndex(column => column === id);
        columnOrder.splice(idx, 1);
        const msg = `'${column.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger';
        this.props.updateBoard(board, msg, notificationType);
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        };

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        };

        if (type === 'column') {
            const newColumnOrder = this.props.board.columnOrder.slice();
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            const columnTitle = this.props.board.columns[draggableId].title;
            const newBoard = {
                ...this.props.board,
                columnOrder: newColumnOrder
            }
            const msg = `'${columnTitle}' was moved by ${this.props.user}`;
            const notificationType = 'success';
            return this.props.updateBoard(newBoard, msg, notificationType);
        };

        const start = this.props.board.columns[source.droppableId];
        const finish = this.props.board.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = start.taskIds.slice();
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };
            const newBoard = {
                ...this.props.board,
                columns: {
                    ...this.props.board.columns,
                    [newColumn.id]: newColumn
                }
            };
            const taskTitle = this.props.board.tasks[draggableId].title;
            const msg = `${this.props.user} changed the position of the task '${taskTitle}'`;
            const notificationType = 'success';
            return this.props.updateBoard(newBoard, msg, notificationType);
        };

        const startTaskIds = start.taskIds.slice();
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = finish.taskIds.slice();
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newBoard = {
            ...this.props.board,
            columns: {
                ...this.props.board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        const taskTitle = this.props.board.tasks[draggableId].title;
        const msg = `${this.props.user} moved the task '${taskTitle}' from '${newStart.title}' to '${newFinish.title}'`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    setColumnName = (columnId) => {
        const columnTitle = this.props.board.columns[columnId].title;
        this.setState({ title: columnTitle });
    }

    emitChange = (ev) => {
        this.setState({ title: ev.target.innerText });
    }

    saveColumnName = (columnId, title) => {
        const columnTitle = this.props.board.columns[columnId].title;
        if (columnTitle === title) return;

        const updatedBoard = { ...this.props.board };
        updatedBoard.columns[columnId].title = title;

        const msg = `${this.props.user} changed the name of '${columnTitle}' to '${title}'`;
        const notificationType = 'success';

        this.props.updateBoard(updatedBoard, msg, notificationType);
    }

    addCardText(column) {
        return (column.taskIds.length === 0) ? 'Add a card' : 'Add another card';
    }

    render() {
        const { boardToShow, currColumnId, showTopMenuOptions, showAddForm } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {provided => (
                        <div
                            className="board-columns flex"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {boardToShow.columnOrder.map((columnKey, idx) => {

                                const column = boardToShow.columns[columnKey];
                                const tasks = column.taskIds.map(currId => this.props.board.tasks[currId]);

                                return (
                                    <Draggable draggableId={columnKey} key={column.id} index={idx}>

                                        {(provided, snapshot) => (
                                            <NaturalDragAnimation
                                                style={provided.draggableProps.style}
                                                snapshot={snapshot}
                                                rotationMultiplier={1.3}
                                            >
                                                {style => (

                                                    <div
                                                        className="board-columns-item"
                                                        {...provided.draggableProps}
                                                        ref={provided.innerRef}
                                                        style={style}
                                                    >
                                                        <div
                                                            className="board-columns-item-header flex align-center space-between"
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className="board-columns-item-header-h2-wrapper">
                                                                <h2
                                                                    contentEditable='true'
                                                                    spellCheck="false"
                                                                    onFocus={() => this.setColumnName(column.id)}
                                                                    onInput={(ev) => this.emitChange(ev)}
                                                                    onBlur={() => this.saveColumnName(column.id, this.state.title)}
                                                                    suppressContentEditableWarning={true}
                                                                >
                                                                    {column.title}
                                                                </h2>
                                                            </div>



                                                            <div className="board-columns-item-header-menu-btn-icon"
                                                                onClick={(ev) => { ev.stopPropagation(); this.props.openEditColumn(column.id) }}> ... </div>
                                                        </div>



                                                        {showTopMenuOptions && (currColumnId === column.id) ?
                                                            <TopMenuOptions
                                                                onDelete={this.onDelete}
                                                                column={column}
                                                                board={this.props.board}
                                                                updateBoard={this.props.updateBoard}
                                                                toggleTopMenuOptions={this.props.closeEditColumn}
                                                                user={this.props.user}
                                                            />
                                                            : ''}
                                                        <Droppable droppableId={column.id} type="task">
                                                            {(provided, snapshot) => {
                                                                return <TasksList
                                                                reRender={this.reRender}
                                                                    board={this.props.board}
                                                                    innerRef={provided.innerRef}
                                                                    provided={provided}
                                                                    tasks={tasks}
                                                                    isDraggingOver={snapshot.isDraggingOver}
                                                                    column={column}
                                                                    toggleTaskDetails={this.props.toggleTaskDetails}
                                                                    updateBoard={this.props.updateBoard}
                                                                    toggleMiniDetails={this.props.toggleMiniDetails}
                                                                    user={this.props.user}
                                                                >
                                                                </TasksList>
                                                            }}
                                                        </Droppable>
                                                        {(!showAddForm || currColumnId !== column.id) &&
                                                            <div className="task-list-footer flex align-center">
                                                                <div className="task-list-footer-add-task fill-width"
                                                                    onClick={(ev) => { ev.stopPropagation(); this.props.openAddForm(column.id) }}>
                                                                    <span className="add-icon">+</span>{this.addCardText(column)}</div>
                                                            </div>
                                                        }
                                                        {showAddForm && (currColumnId === column.id) ?
                                                            <TaskForm
                                                                user={this.props.user}
                                                                board={this.props.board}
                                                                column={column}
                                                                closeUpdateForm={this.props.closeAddForm}
                                                                updateBoard={this.props.updateBoard}
                                                            />
                                                            : ''
                                                        }
                                                    </div>
                                                )}
                                            </NaturalDragAnimation>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
            </DragDropContext>
        );
    }
}