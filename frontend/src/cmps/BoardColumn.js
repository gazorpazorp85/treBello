import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';

// import { Link } from 'react-router-dom';

function BoardColumn({columns}) {
    return (
        <section>
            <ul>
                {columns.map(column => (
                    <li key={column.id}>
                        <TasksList tasks={column.tasks} />
                    </li>
                ))}
            </ul>

        </section>
    )
}

export default withRouter(BoardColumn)