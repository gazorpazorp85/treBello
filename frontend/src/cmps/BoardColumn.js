import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';

// import { Link } from 'react-router-dom';

function BoardColumn({ columns }, props) {
    return (
        < section >
            <div>
                {columns.map(column => (
                    <div key={column.id}>
                        <TasksList tasks={column.tasks} />
                        <button onClick={props.onEditColumn}>Edit Column</button>
                    </div>
            ))}
            </div>

        </section >
    )
}

export default withRouter(BoardColumn)