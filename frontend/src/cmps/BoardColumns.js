import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import TasksList from './TasksList';
import ColumnAddForm from '../cmps/ColumnAddForm';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class BoardColumns extends Component {

    state = {
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
        let filteredColumns = board.columns.filter(column => column.id !== id);
        board.columns = filteredColumns;
        this.props.updateBoard(board);
        this.handleOptionsMenuClose();
    }

    handleOptionsMenuClick = (event, id) => {
        this.setState(({ currColumnId: id, anchorEl: event.currentTarget }));
    };

    handleOptionsMenuClose = _ => {
        this.setState({ anchorEl: null });
    };

    onDragEnd = results => {
        //todo: reorder
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="board-columns flex">
                    {this.props.board.columnOrder.map(columnKey => {
                        const column = this.props.board.columns[columnKey];
                        const tasks = column.taskIds.map(currId => this.props.board.tasks[currId]);

                        return <div className="board-columns-item" key={column.id}>
                            <div className="board-columns-item-header flex align-center space-between">
                                <h2>{column.title}</h2>
                                <MenuOpenIcon onClick={ev => this.handleOptionsMenuClick(ev, column.id)} />
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
                            <Droppable droppableId={column.id}>
                                {provided => (
                                    <TasksList
                                        innerRef={provided.innerRef}
                                        provided={provided}
                                        tasks={tasks}
                                    >
                                        {/* {provided.placeholder} */}
                                    </TasksList>
                                )}
                            </Droppable>
                        </div>
                    })}
                </div >
            </DragDropContext>
        );
    }
}
