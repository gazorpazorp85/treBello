import React from 'react';
import { withRouter } from 'react-router';
import TaskPreview from './TaskPreview'
import { Draggable } from 'react-beautiful-dnd'


function TasksList({ tasks, provided, innerRef }) {
    return (
        <section className="board-column" {...provided.droppableProps} ref={innerRef}>
            <div>
                {tasks.map((task, idx) => (
                    <div key={task.id}>
                        <Draggable draggableId={task.id} index={idx}>
                        {provided => (
                            <TaskPreview provided={provided} innerRef={provided.innerRef} task={task}>
                            </TaskPreview>
                        )}
                        </Draggable>
                        {provided.placeholder}
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