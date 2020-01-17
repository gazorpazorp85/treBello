import React from 'react';
import { withRouter } from 'react-router';

import TaskPreview from './TaskPreview'

function TasksList({ tasks }) {
    return (
        <section className="board-column">
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        <TaskPreview task={task} />
                    </div>
                ))}
                <div className="board-column-footer">
                    <p> + Add a card </p>
                </div>
            </div>
        </section>
    )
}

export default withRouter(TasksList) 