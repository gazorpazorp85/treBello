import React from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';

// import 'moment/locale/es'

export default function VideoPreview({ task, provided, innerRef, isDragging, style, onDelete, showEditBtn }) {
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
                <iframe title={task.id} type='text/html' width="200" height="113" src={task.url}></iframe>
                {/* <small>Created at: {moment(createdAtFormat).calendar()}</small>
                    <small>Expires: {moment(dueDateFormat).calendar()}</small>
                    <small>Importance: {task.importance}</small>
                    <small>created by: {task.creator.userName}</small> */}
                {/* <div className="task-container-open-menu" > */}
                {/* {(showEditBtn) ? */}
                {/* <CreateIcon className="task-container-open-menu"
                    onClick={onDelete} /> */}
                <button className="task-container-open-menu"
                    onClick={onDelete}>x</button>
                {/* : '' */}
                {/* } */}
                {/* </div> */}
            </Card>
        </section>
    )
}