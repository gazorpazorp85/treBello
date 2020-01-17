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
        this.setState({ currColumnId: id });
        this.setState((prevState) => ({ showForm: !prevState.showForm }));
    }

    toggleTopMenuOptions = (id) => {
        this.setState({ currColumnId: id });
        this.setState(prevState => ({ showTopMenuOptions: !prevState.showTopMenuOptions }));
    }

    onDelete = (id) => {
        let board = { ...this.props.board };
        let filteredColumns = board.columns.filter(column => column.id !== id);
        board.columns = filteredColumns;
        this.props.updateBoard(board);
        this.handleOptionsMenuClose();
    }

    handleOptionsMenuClick = event => {
        this.setState(({ anchorEl: event.currentTarget }));
    };

    handleOptionsMenuClose = () => {
        this.setState({ anchorEl: null })
    };

    render() {
        return (
            <div className="board-columns flex">
                {this.props.board.columns.map(column => (
                    <div className="board-columns-item" key={column.id}>
                        <div className="board-columns-item-header flex align-center space-between">
                            <h2>{column.title}</h2>
                            <MenuOpenIcon onClick={this.handleOptionsMenuClick} />
                        </div>

                        <Menu
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleOptionsMenuClose}
                        >

                            {/* {(this.state.showTopMenuOptions && this.state.currColumnId === column.id) ? */}
                            {/* <div className="board-columns-item-header-top-menu-options flex"> */}
                                <MenuItem onClick={() => this.onDelete(column.id)}>
                                    X
                                </MenuItem>
                                <MenuItem onClick={() => this.toggleAddForm(column.id)}>
                                    Edit
                                </MenuItem>
                            {/* </div> */}
                            {/* : '' */}


                        </Menu>


                        {(this.state.showForm && this.state.currColumnId === column.id) ?
                            <ColumnAddForm board={this.props.board} toggleAddForm={this.toggleAddForm} column={column} /> : ''}
                        <TasksList tasks={column.tasks} />
                    </div>
                ))}
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