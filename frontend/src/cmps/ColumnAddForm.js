import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions'

import utils from '../services/utils'

import CloseIcon from '@material-ui/icons/Close';

class ColumnAddForm extends Component {

    state = {
        column: {
            id: utils.getRandomId(),
            title: '',
            taskIds: []
        }
    }

    componentDidMount() {
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.column !== this.props.column) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        const column = this.props.column;
        if (column) {
            this.setState({
                column: {
                    id: column.id,
                    title: column.title,
                    taskIds: column.taskIds
                }
            })
        }
    }

    inputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState({ column: { ...this.state.column, [fieldName]: value } })
    }

    saveColumn = (ev) => {
        ev.preventDefault();
        let board = { ...this.props.board };
        let columns = board.columns;
        let id = this.state.column.id;
        columns[id] = this.state.column;
        const columnOrder = board.columnOrder;
        if (!columnOrder.includes(id)) columnOrder.push(id);
        this.props.updateBoard(board);
        this.props.toggleAddForm();
    }

    render() {
        return <div>
            <form className="add-column-form-container flex column space-between" onSubmit={this.saveColumn}>
                <input type='text' placeholder='Column Name' name='title'
                    onChange={this.inputChange} value={this.state.column.title} />
                <div className="add-column flex">
                    <button className="add-column-save-btn"
                        variant="contained">SAVE</button>

                    <CloseIcon className="add-column-back-to-board flex align-center"
                        onClick={this.props.toggleAddForm} />

                </div>
            </form>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnAddForm);