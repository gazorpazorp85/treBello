import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';
import Card from '@material-ui/core/Card';

// import { Link } from 'react-router-dom';

function BoardColumns({ columns }) {
    return (
        <div className="board-columns grid-container">

            {columns.map(column => (
                <div className="board-columns-grid-item" key={column.id}>
                    <h2>{column.title}</h2>
                    <TasksList tasks={column.tasks} />
                    {/* <button onClick={props.onEditColumn}>Edit Column</button> */}
                </div>
            ))}

        </div >
    )
}

export default withRouter(BoardColumns)