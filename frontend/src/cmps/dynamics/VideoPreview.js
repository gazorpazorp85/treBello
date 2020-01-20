import React from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';

// import 'moment/locale/es'

export default function VideoPreview({ task, provided, innerRef, isDragging, style, onDelete, showEditBtn, onTaskId}) {
    // const createdAtFormat = new Date(task.createdAt).toString();
    // const dueDateFormat = new Date(task.dueDate).toString();
    return (
        <section>
            <Card
                className={"task-container" + (isDragging ? " isDragging" : "")}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                style={style}
            >
                <p>{task.title}</p>
                <iframe title={task.id} type='text/html' width="250" height="144" src={task.url}></iframe>
                {(showEditBtn && (onTaskId === task.id)) ?
                    <div className="task-container-open-menu-wrapper flex align-center justify-center">
                        <CreateIcon className="task-container-open-menu"
                            onClick={onDelete} />
                    </div>
                    : ''}
            </Card>
        </section>
    )
}