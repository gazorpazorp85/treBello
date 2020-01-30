import React, { Component } from 'react';
import utils from '../services/utils'
import CloseIcon from '@material-ui/icons/Close';

export default class TaskList extends Component {
    state = {
        todos: [],
        text: '',
        // toggleTodo: false
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ todos: this.props.task.todos })
    }

    // toggleTodo = () => {
    //     this.setState(prevState => ({ toggleTodo: !prevState.toggleTodo }))
    // }

    updateTodo = (ev) => {
        this.setState({ text: ev.target.value })
    }


    onSaveTodo = () => {
        const todo = {
            text: this.state.text,
            isDone: false,
            id: utils.getRandomId()
        }
        const todos = this.state.todos
        todos.push(todo)

        this.setState({
            todos
        })

        const newTask = { ...this.props.task, todos: this.state.todos };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        return (
            <div className="check-list-item-container text-center"
                onClick={(ev) => this.onStopPropagation(ev)}
            >
                <div className="checklist-closebtn-container">
                    <CloseIcon className="check-list-item-container-close-btn pointer" onClick={this.props.toggleTodos} />
                </div>

                <div className="input-container flex column justify-center align-center">
                    <input className="text-center" type="text" placeholder="add new todo"
                        value={this.state.text}
                        onChange={this.updateTodo} name="text">
                    </input>
                    <button className="save-todo-btn capitalize" onClick={this.onSaveTodo}>add</button>
                </div>

            </div>
        );

    }
}