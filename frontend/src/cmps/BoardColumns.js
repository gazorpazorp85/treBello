import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import TopMenuOptions from './TopMenuOptions'
import TasksList from './TasksList';
import ColumnAddForm from '../cmps/ColumnAddForm';
import TaskForm from '../cmps/TaskForm'



import utils from '../services/utils';

export default class BoardColumns extends Component {

    state = {
        showAddColumnForm: false,
        showTopMenuOptions: false,
        showAddForm: false,
        showEditBtn: true,
        currColumnId: '',
        anchorEl: null,
        timer: null,
        title: ''
    }

    toggleAddForm = (id) => {
        this.setState((prevState) => ({ showForm: !prevState.showForm, currColumnId: id }));
    }

    toggleTopMenuOptions = (id) => {
        this.setState(prevState => ({ showTopMenuOptions: !prevState.showTopMenuOptions, currColumnId: id }));
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
        this.props.updateBoard(board);
        let msg = `'${column.title}' was deleted by ${this.props.user}`;
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() })
        utils.emitNotification(msg, 'danger');
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
            let msg = `'${columnTitle}' was moved by ${this.props.user}`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'success');
            return this.props.updateBoard(newBoard);
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
            let msg = `${this.props.user} changed the position of the task '${taskTitle}'`;
            this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
            utils.emitNotification(msg, 'success');

            return this.props.updateBoard(newBoard);
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
        console.log('newStart', newStart.title);
        console.log('newFinish', newFinish.title);

        const newBoard = {
            ...this.props.board,
            columns: {
                ...this.props.board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        const taskTitle = this.props.board.tasks[draggableId].title;
        let msg = `${this.props.user} moved the task '${taskTitle}' from '${newStart.title}' to '${newFinish.title}'`;
        this.props.board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() });
        utils.emitNotification(msg, 'success');
        this.props.updateBoard(newBoard);
    }

    handleCheck = (colId, title) => {
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(() => {
                const updatedBoard = { ...this.props.board };
                updatedBoard.columns[colId].title = title;
                this.props.updateBoard(updatedBoard);
            }, 1000)
        });
    }

    emitChange = (ev, colId) => {
        this.setState({ title: ev.target.innerText }, _ => {
            this.handleCheck(colId, this.state.title);
        });
    }


    // toggleUpdateForm = (id) => {
    //     this.setState((prevState) => ({
    //         showAddForm: !prevState.showAddForm, currColumnId: id,
    //     }))
    // }

    openUpdateForm = (id) => {
        this.setState({ showAddForm: true, currColumnId: id })
    }

    closeUpdateForm = (id) => {
        this.setState({ showAddForm: false, currColumnId: id })
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {provided => (
                        <div
                            className="board-columns flex"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {this.props.board.columnOrder.map((columnKey, idx) => {

                                const column = this.props.board.columns[columnKey];
                                const tasks = column.taskIds.map(currId => this.props.board.tasks[currId]);

                                return <Draggable draggableId={columnKey} key={column.id} index={idx}>

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
                                                                onInput={(ev) => this.emitChange(ev, column.id)}
                                                                suppressContentEditableWarning={true}
                                                            >
                                                                {column.title}
                                                            </h2>
                                                        </div>

                                                        <div className="board-columns-item-header-menu-btn" onClick={() => this.toggleTopMenuOptions(column.id)}>
                                                            <h2 className="board-columns-item-header-menu-btn-icon"> ... </h2>
                                                        </div>

                                                    </div>

                                                    {(this.state.showTopMenuOptions) && (this.state.currColumnId === column.id) ?
                                                        <TopMenuOptions
                                                            onDelete={this.onDelete}
                                                            column={column}
                                                            board={this.props.board}
                                                            updateBoard={this.props.updateBoard}
                                                            toggleTopMenuOptions={this.toggleTopMenuOptions}
                                                        />
                                                        : ''}

                                                    {(this.state.showAddColumnForm && this.state.currColumnId === column.id)
                                                        && <ColumnAddForm
                                                            board={this.props.board}
                                                            toggleAddForm={this.toggleAddForm}
                                                            column={column}
                                                            updateBoard={this.props.updateBoard}
                                                        />}
                                                    <Droppable droppableId={column.id} type="task">
                                                        {(provided, snapshot) => {
                                                            return <TasksList
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

                                                    <div className="task-list-footer">
                                                        {!this.state.showAddForm && this.state.currColumnId === column.id ?
                                                            <p className="task-list-footer-add-task"
                                                                onClick={() => this.openUpdateForm(column.id)}>
                                                                + Add a task</p>
                                                            :
                                                            this.state.currColumnId !== column.id ?
                                                                <p className="task-list-footer-add-task"
                                                                    onClick={() => this.openUpdateForm(column.id)}>
                                                                    + Add a task</p>
                                                                : ''
                                                        }


                                                        {(this.state.showAddForm && this.state.currColumnId === column.id) ?
                                                            <TaskForm
                                                                user={this.props.user}
                                                                board={this.props.board}
                                                                column={column}
                                                                closeUpdateForm={this.closeUpdateForm}
                                                                updateBoard={this.props.updateBoard}
                                                            />
                                                            : ''
                                                        }
                                                    </div>
                                                </div>

                                            )}
                                        </NaturalDragAnimation>
                                    )}
                                </Draggable>
                            })}
                            {provided.placeholder}
                        </div >)}
                </Droppable>
            </DragDropContext>
        );
    }
}
