import React, { Component } from 'react';
import TaskForm from './TaskForm';

export default class TaskDetails extends Component {
    state = {
        description: '',
        saveBtnHidden: true
    }

    componentDidMount() {
        this.setState({ description: this.props.board.tasks[this.props.taskId].description });
    }

    emitChange = (ev) => {
        const targetValue = ev.target.value;
        console.log('des', targetValue)
        this.setState({ description: targetValue });
    }

    onToggleSaveBtn = _ => {
        this.setState({ saveBtnHidden: false })
    }

    onSave = _ => {
        this.setState({ saveBtnHidden: true }, _ => {
            const newTask = { ...this.props.task, description: this.state.description };
            const newBoard = {
                ...this.props.board,
                tasks: {
                    ...this.props.board.tasks,
                    [newTask.id]: newTask
                }
            }
            this.props.updateBoard(newBoard);
        })
    }

    render() {
        const task = this.props.board.tasks[this.props.taskId];
        const { column } = this.props;

        return (
            <div className="task-details-container">
                <header>
                    <h2>{task.title}</h2>
                    <p>in list {column.title}</p>
                </header>

                <main>
                    <h3>Description</h3>
                    <textarea
                        name="description"
                        rows="10"
                        cols="60"
                        onInput={this.emitChange}
                        // onClick={this.onToggleSaveBtn}
                        defaultValue={task.description}
                        placeholder="Add a more detailed description...">
                    </textarea>
                    {/* {!this.state.saveBtnHidden && <button onClick={this.onSave}>Save</button>} */}
                </main>

                <TaskForm
                    board={this.props.board}
                    column={column}
                    task={task}
                    updateBoard={this.props.updateBoard}
                    toggleTaskDetails={this.props.toggleTaskDetails}
                    description={this.state.description}
                />
            </div>
        )
    }
}