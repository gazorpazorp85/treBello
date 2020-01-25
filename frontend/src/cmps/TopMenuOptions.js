import React, { Component } from 'react'
import utils from '../services/utils'
export default class TopMenuOptions extends Component {

    state = {

    }

    onCopy = (column, board) => {
        let newColumn = { ...column }
        let newBoard = { ...board }
        const newId = utils.getRandomId();
        newColumn.id = newId;
        board.columnOrder.push(newId);

        debugger
        newColumn.taskIds.forEach(currId => {
            // const saveId = currId
            const newId = utils.getRandomId();
            newBoard.tasks[newId] = newId;
            // newBoard.tasks[newId] = newId
            const newTask = {
                ...board.tasks[currId],
                id: newId
            }
            newBoard.tasks[newId] = newTask

            // newColumn.taskIds.push(newId);
            const idx = column.taskIds.findIndex(currIdx => currIdx === currId)
            newColumn.taskIds = newColumn.taskIds.splice(idx, 1, newId)
            // newColumn.taskIds.push(newId)
        })

        board.columns[newId] = newColumn;
        this.props.toggleTopMenuOptions(column.id);
        // this.props.updateBoard(newBoard);

    }




    render() {
        const { column } = this.props
        const { board } = this.props

        return <div className="top-menu-options">
            <h2 className="text-center">options menu</h2>
            <div className="options-container flex column">
                <p >rename list</p>
                <p onClick={() => this.onCopy(column, board)}>copy</p>
                <p onClick={() => this.props.onDelete(column.id)}>delete</p>
            </div>

        </div>
    }
}