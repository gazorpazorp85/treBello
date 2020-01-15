import React from "react";

export default function TaskPreview({ task }) {
    return (
        <section>
            <h5>Title: {task.title}</h5>
            <h5>Created at: {task.createdAt}</h5>
            <h5>Expires: {task.dueDate}</h5>
            <h5>Importance: {task.importance}</h5>
            <h5>created by: {task.creator.userName}</h5>
        </section>  
    )
}