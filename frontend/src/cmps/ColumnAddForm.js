import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import utils from '../services/utils';

export default class ColumnAddForm extends Component {

    state = {
        column: {
            id: utils.getRandomId(),
            title: '',
            taskIds: []
        }
    }

    componentDidMount() {        
        this.nameInput.focus();
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.column !== this.props.column) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        if (this.props.column) {
            const column = this.props.column;
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
        const newBoard = {
            ...this.props.board,
            columns: {
                ...this.props.board.columns,
                [this.state.column.id]: this.state.column
            }
        };
        const id = this.state.column.id;
        const columnOrder = newBoard.columnOrder;
        if (!columnOrder.includes(id)) columnOrder.push(id);
        this.props.updateBoard(newBoard);
        this.props.toggleAddForm();
    }

    render() {
        return <div>
            <form className="add-column-form-container flex column space-between" onSubmit={this.saveColumn}>
                <input
                    ref={(input) => { this.nameInput = input; }}
                    // defaultValue="will focus"
                    type='text'
                    placeholder='Column Name'
                    name='title'
                    onChange={this.inputChange}
                    value={this.state.column.title} />
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
