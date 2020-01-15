import React from 'react';
import { withRouter } from 'react-router';

import TaskPreview from './TaskPreview'

function TasksList({tasks}) {
    return (
        <section>
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        <TaskPreview task={task} />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default withRouter(TasksList) 