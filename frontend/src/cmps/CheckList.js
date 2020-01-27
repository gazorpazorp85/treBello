import React, { Component } from 'react';
import utils from '../services/utils'
import CloseIcon from '@material-ui/icons/Close';

export default class TaskList extends Component {
    state = {
        checkList: [],
        text: '',
        toggleCheckListItem: false
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ checkList: this.props.task.checkList })
    }

    toggleCheckListItem = () => {
        this.setState(prevState => ({ toggleCheckListItem: !prevState.toggleCheckListItem }))
    }

    updateCheckListItem = (ev) => {
        this.setState({ text: ev.target.value })
    }


    onSaveCheckListItem = () => {
        const checkListItem = {
            text: this.state.text,
            id: utils.getRandomId()
        }
        const checkList = this.state.checkList
        checkList.push(checkListItem)

        this.setState({
            checkList
        })

        const newTask = { ...this.props.task, checkList: this.state.checkList };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }

        debugger
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
                <CloseIcon className="check-list-item-container-close-btn" onClick={this.props.toggleCheckList} />
                <div className="add-check-list-item-wrapper">
                    <button className="add-check-list-item uppercase fill-width" onClick={this.toggleCheckListItem}>add task</button>
                </div>

                {this.state.toggleCheckListItem &&
                    <div className="input-container flex column justify-center align-center">
                        <input className="text-center" type="text" placeholder="add new todo"
                            value={this.state.text}
                            onChange={this.updateCheckListItem} name="text">
                        </input>
                        <button onClick={this.onSaveCheckListItem}>save</button>
                    </div>
                }

                <ul className="todos-contaienr ">
                    {
                        this.props.task.checkList.map(todo => {
                            return <li key={todo.id} className="todo-item">
                                {todo.text}
                            </li>
                        })
                    }
                </ul>

                <div className="task-list-container-colors-container flex column align-center ">
                </div>
            </div>
        );

    }
}
