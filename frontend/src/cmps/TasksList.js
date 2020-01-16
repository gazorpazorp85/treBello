import React from 'react';
import { withRouter } from 'react-router';

import TaskPreview from './TaskPreview'

function TasksList({tasks}) {
    return (
        <section className="board-column">
            <div>
                {tasks.map(task => (
                    <div className="grid-item" key={task.id}>
                        <TaskPreview task={task} />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default withRouter(TasksList) 