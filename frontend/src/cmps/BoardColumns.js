import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions';

import TasksList from './TasksList';
import ColumnAddForm from '../cmps/ColumnAddForm';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


class BoardColumns extends Component {

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

    handleOptionsMenuClose = () => {
        this.setState({ anchorEl: null })
        // setAnchorEl(null);
    };

    render() {
        return (
            <div className="board-columns flex">
                {this.props.board.columns.map(column => {
                    return <div className="board-columns-item flex column space-between" key={column.id}>
                        <div className="board-columns-item-header flex align-center space-between">
                            <h2>{column.title}</h2>
                            <MenuOpenIcon onClick={event => this.handleOptionsMenuClick(event, column.id)} />
                        </div>

                        <Menu
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleOptionsMenuClose}
                        >
                                <MenuItem onClick={() => this.onDelete(this.state.currColumnId)}>
                                    X
                                </MenuItem>
                                <MenuItem onClick={() => this.toggleAddForm(this.state.currColumnId)}>
                                    Edit
                                </MenuItem>
                        </Menu>

                        {(this.state.showForm && this.state.currColumnId === column.id) ?
                            <ColumnAddForm board={this.props.board} toggleAddForm={this.toggleAddForm} column={column} /> : ''}
                        <TasksList tasks={column.tasks} column={column}/>
                    </div>
                })}
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumns);