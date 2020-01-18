import React from 'react';
import { withRouter } from 'react-router';
import TaskPreview from './TaskPreview'
import { Draggable } from 'react-beautiful-dnd'


function TasksList({ tasks, provided, innerRef, isDraggingOver }) {
    return (
        <section
            className={"board-column" + (isDraggingOver ? " isDraggingOver" : "")}
            {...provided.droppableProps}
            ref={innerRef}
        >
            <div>
                {tasks.map((task, idx) => (
                    <div key={task.id}>
                        <Draggable draggableId={task.id} index={idx}>
                            {(provided, snapshot) => (
                                <TaskPreview
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                    task={task}
                                    isDragging={snapshot.isDragging}
                                >
                                </TaskPreview>
                            )}
                        </Draggable>
                    </div>
                ))}
                {provided.placeholder}
                <div className="board-column-footer">
                    <p> + Add a card </p>
                </div>
            </div>
        </section>
    )
}

export default withRouter(TasksList) 