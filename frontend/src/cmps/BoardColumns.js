import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions'

import TasksList from './TasksList';

class BoardColumns extends Component {

    onDelete = (id) => {
        let board = {...this.props.board};
        let filteredColumns = board.columns.filter(column => column.id !== id);
        board.columns = (filteredColumns);
        this.props.updateBoard(board);
    }

    render() {

        // {columns.map(column => (
        //     <div className="board-columns-item" key={column.id}>
        //         <div className="board-columns-item-header flex align-center space-between">
        //             <h2>{column.title}</h2>
        //             <p>
        //                 X
        //                </p>

        return (
            <div className="board-columns flex">
                {this.props.board.columns.map(column => (
                    <div className="board-columns-item" key={column.id}>
                        <div className="board-columns-item-header flex align-center space-between">
                            <h2>{column.title}</h2>
                            <div onClick={() => this.onDelete(column.id)}>X</div>
                        </div>
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