import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';

// import { Link } from 'react-router-dom';

function BoardColumns({ columns }) {
    return (
        < section >
            <div className="board-columns grid-container">
                {columns.map(column => (
                    <div className="board-columns-grid-item" key={column.id}>
                        <div>
                            <h2>{column.title}</h2>
                        </div>
                        <TasksList tasks={column.tasks} />
                        {/* <button onClick={props.onEditColumn}>Edit Column</button> */}
                    </div>
                ))}
            </div>

        </section >
    )
}

export default withRouter(BoardColumns)