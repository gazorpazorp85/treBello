import React from 'react';
import { withRouter } from 'react-router';
import TasksList from './TasksList';

// import { Link } from 'react-router-dom';

function BoardColumn({columns}) {
    return (
        <section>
            <div>
                {columns.map(column => (
                    <div key={column.id}>
                        <TasksList tasks={column.tasks} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default withRouter(BoardColumn)