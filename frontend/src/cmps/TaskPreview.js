import React from "react";
import moment from 'moment';
// import 'moment/locale/es'

export default function TaskPreview({ task }) {
    const createdAtFormat = new Date(task.createdAt).toString();
    const dueDateFormat = new Date(task.dueDate).toString();
    return (
        <section>
            <h5>Title: {task.title}</h5>
            <h5>Created at: {moment(createdAtFormat).calendar()}</h5>
            <h5>Expires: {moment(dueDateFormat).calendar()}</h5>
            <h5>Importance: {task.importance}</h5>
            <h5>created by: {task.creator.userName}</h5>
        </section>  
    )
}