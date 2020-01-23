import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

export default class DueDate extends React.Component {
    state = {
        dueDate: new Date()
    }

    componentDidMount(){
    }

    componentWillUnmount() {
        this.saveTask(this);
    }

    handleChange = date => {
        this.setState({ dueDate: date });
    }

    saveTask = _ => {
        const newTask = { ...this.props.task, dueDate: Date.now(this.state.dueDate) };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
    }

    render() {

        return (
            <DatePicker
                selected={this.state.dueDate}
                onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
        )
    }
}