import React from "react";
// import moment from 'moment';
import Card from '@material-ui/core/Card';

// import 'moment/locale/es'

export default function TaskPreview({ task, provided, innerRef }) {
    // const createdAtFormat = new Date(task.createdAt).toString();
    // const dueDateFormat = new Date(task.dueDate).toString();
    return (
        <section>
            <Card
                className="task-container"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                <p>{task.content}</p>
                {/* <small>Created at: {moment(createdAtFormat).calendar()}</small>
                    <small>Expires: {moment(dueDateFormat).calendar()}</small>
                    <small>Importance: {task.importance}</small>
                    <small>created by: {task.creator.userName}</small> */}
            </Card>
        </section>
    )
}