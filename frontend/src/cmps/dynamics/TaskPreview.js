import React from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';


export default function TaskPreview({ task, provided, innerRef, isDragging, style, onDelete, showEditBtn, onTaskId }) {
    return (
        <section>
                <div
                    className={"task-container" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <p>{task.title}</p>
                    {(showEditBtn && (onTaskId === task.id)) ?
                        <div className="task-container-open-menu-wrapper flex align-center justify-center">
                            <CreateIcon className="task-container-open-menu"
                                onClick={onDelete} />
                        </div>
                        : ''}
                </div>
        </section>
    )
}