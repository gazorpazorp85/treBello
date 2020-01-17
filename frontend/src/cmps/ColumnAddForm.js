import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/BoardActions'

import utils from '../services/utils'

class ColumnAddForm extends Component {

    state = {
        column: {
            id: utils.getRandomId(),
            title: '',
            tasks: []
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
                    tasks: column.tasks
                }
            })
        }
    }

    inputChange = (ev) => {
        console.log(this.state);
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState({ column: { ...this.state.column, [fieldName]: value } })
    }

    saveColumn = (ev) => {
        ev.preventDefault();
        let board = { ...this.props.board };
        let id = this.state.column.id;
        let idx = board.columns.findIndex(column => column.id === id);
        (idx === -1) ? board.columns.push(this.state.column) :
            board.columns.splice(idx, 1, this.state.column);
        this.props.updateBoard(board);
        this.setState({
            column: {
                id: '',
                title: '',
                tasks: []
            }
        })
        this.props.toggleAddForm();
    }

    render() {
        return <div>
            <form onSubmit={this.saveColumn}>
                <input type='text' placeholder='Column Name' name='title'
                    onChange={this.inputChange} value={this.state.column.title} />
                <button>Save</button>
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