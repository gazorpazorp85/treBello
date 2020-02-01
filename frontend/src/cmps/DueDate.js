import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

export default class DueDate extends React.Component {
    state = {
        dueDate: null
    }

    componentDidMount() {
        this.setDate();
    }

    setDate = _ => {
        this.setState({ dueDate: this.props.task.dueDate ? new Date(this.props.task.dueDate) : new Date() })
    }

    // componentWillUnmount() {
    //     this.saveTask();
    // }

    handleChange = date => {
        this.setState({ dueDate: date });
        this.saveTask();
    }

    saveTask = _ => {
        const newTask = { ...this.props.task, dueDate: this.state.dueDate.getTime() };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `${this.props.user} changed the due date for task '${this.props.task.title}'`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);

    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {

        return (
            <div className="duedate-edit flex column"
                onClick={(ev) => this.onStopPropagation(ev)}>
                <div className="close-btn-container">
                    <CloseIcon className="duedate-edit-close-btn" onClick={this.props.onToggle} />
                </div>

                <div className="flex column align-center justify-center datepicker-container">
                    <DatePicker
                        selected={this.state.dueDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        popperModifiers={{
                            flip: {behavior: ['bottom']},
                            preventOverflow: { enabled: false }
                        }}
                    />
                    <button className="add-duedate-btn capitalize" onClick={this.saveTask}>add</button>
                </div>
            </div>
        )
    }
}