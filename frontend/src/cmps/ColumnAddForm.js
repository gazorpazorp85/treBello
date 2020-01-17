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
        const { column } = this.props;
        if (column) {
            this.setState({
                id: column.id,
                title: column.title,
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
        let board = {...this.props.board};
        board.columns.push(this.state.column);
        this.props.updateBoard(board);
        this.setState({column: {id: utils.getRandomId(),
                       title: '',
                       tasks: []}})
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