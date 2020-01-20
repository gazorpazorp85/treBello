import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import TasksList from './TasksList';
import ColumnAddForm from '../cmps/ColumnAddForm';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class BoardColumns extends Component {

    state = {
        chacked: false,
        showForm: false,
        showTopMenuOptions: false,
        currColumnId: '',
        anchorEl: null
    }

    toggleAddForm = (id) => {
        this.setState((prevState) => ({ showForm: !prevState.showForm, currColumnId: id }));
    }

    toggleTopMenuOptions = (id) => {
        this.setState(prevState => ({ showTopMenuOptions: !prevState.showTopMenuOptions, currColumnId: id }));
    }

    onDelete = (id) => {
        let board = { ...this.props.board };
        let columnOrder = board.columnOrder;
        let column = board.columns[id];
        for (const taskId of column.taskIds) {
            for (const taskKey in board.tasks){
                if (taskId === taskKey) {
                    delete board.tasks[taskKey];
                }
            }
        }
        delete board.columns[id];
        let idx = columnOrder.findIndex(column => column === id);
        columnOrder.splice(idx, 1);
        this.props.updateBoard(board);
        this.handleOptionsMenuClose();
    }

    handleOptionsMenuClick = (event, id) => {
        this.setState(({ currColumnId: id, anchorEl: event.currentTarget }));
    };

    handleOptionsMenuClose = () => {
        this.setState({ anchorEl: null })
    };

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

            const newBoard = {
                ...this.props.board,
                columnOrder: newColumnOrder
            }

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

        const newBoard = {
            ...this.props.board,
            columns: {
                ...this.props.board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.props.updateBoard(newBoard);
    }

    handleCheck = (board) => {
        // Clears running timer and starts a new one each time the user types
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.toggleCheck();
            this.props.updateBoard(board);
        }, 1000);
    }

    toggleCheck = () => {
        this.setState(prevState => ({ checked: !prevState.checked }));
    }

    emitChange = (ev, id) => {
        ev.preventDefault();
        let board = { ...this.props.board };
        board.columns[id].title = ev.target.innerHTML;
        this.handleCheck(board)
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
                                            rotationMultiplier={1}
                                        >
                                            {style => (
                                                // <div className="board-columns-item-wrapper">
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
                                                                    suppressContentEditableWarning={true}>
                                                                    {column.title}
                                                                </h2>
                                                            </div>

                                                            <div className="board-columns-item-header-menu-btn"
                                                                onClick={ev => this.handleOptionsMenuClick(ev, column.id)}>
                                                                <h2 className="board-columns-item-header-menu-btn-icon"> ... </h2>
                                                            </div>
                                                        {/* </div> */}
                                                    </div>

                                                    <Menu
                                                        anchorEl={this.state.anchorEl}
                                                        open={Boolean(this.state.anchorEl)}
                                                        onClose={this.handleOptionsMenuClose}
                                                    >
                                                        <MenuItem onClick={_ => this.onDelete(this.state.currColumnId)}>
                                                            Delete
                                                </MenuItem>
                                                        <MenuItem onClick={_ => this.toggleAddForm(this.state.currColumnId)}>
                                                            Edit
                                                 </MenuItem>
                                                    </Menu>
                                                    {(this.state.showForm && this.state.currColumnId === column.id)
                                                        ? <ColumnAddForm
                                                            board={this.props.board}
                                                            toggleAddForm={this.toggleAddForm}
                                                            column={column} /> : ''}
                                                    <Droppable droppableId={column.id} type="task">
                                                        {(provided, snapshot) => {
                                                            return <TasksList
                                                                innerRef={provided.innerRef}
                                                                provided={provided}
                                                                tasks={tasks}
                                                                isDraggingOver={snapshot.isDraggingOver}
                                                                column={column}
                                                                isTaskDetailsOccupied={this.props.isTaskDetailsOccupied}
                                                                toggleTaskDetailsOccupied={this.props.toggleTaskDetailsOccupied}
                                                            >
                                                            </TasksList>
                                                        }}
                                                    </Droppable>
                                                </div>
                                            )}
                                        </NaturalDragAnimation>
                                    )}
                                </Draggable>
                            })}
                            {provided.placeholder}
                        </div >
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
