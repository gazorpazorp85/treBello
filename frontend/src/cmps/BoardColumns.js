import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';

// import { Link } from 'react-router-dom';

function BoardColumns({ columns }) {
    return (
        < section >
            <div>
                {columns.map(column => (
                    <div key={column.id}>
                        {column.title}
                        <TasksList tasks={column.tasks} />
                        {/* <button onClick={props.onEditColumn}>Edit Column</button> */}
                    </div>
            ))}
            </div>

        </section >
    )
}

export default withRouter(BoardColumns)