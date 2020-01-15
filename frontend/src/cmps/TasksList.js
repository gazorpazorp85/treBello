import React from 'react';
import { withRouter } from 'react-router';

import TaskPreview from './TaskPreview'

function TasksList(tasks) {
    return (
        <section>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <TaskPreview task={task} />
                    </li>
                ))}
            </ul>

        </section>
    )
}

export default withRouter(TasksList) 