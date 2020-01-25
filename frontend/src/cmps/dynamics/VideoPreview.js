import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';

export default class VideoPreview extends Component {
    state = {
        elTop: 0,
        elLeft: 0,
        elHeight: 0,
    }

    toggleMiniDetails = ev => {
        ev.stopPropagation();
        const miniTask = {
            task: this.props.task,
            left: this.refs.ref.getBoundingClientRect().left,
            top: this.refs.ref.getBoundingClientRect().top,
            height: this.refs.ref.getBoundingClientRect().height,
            previewType: 'video',
            column: this.props.column
        };
        this.props.toggleMiniDetails(miniTask);
    }


    render() {
        const { task, provided, innerRef, isDragging, style, showEditBtn, onTaskId } = this.props;
        return (
            <section ref="ref">
                <div
                    className={"task-container flex column" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <iframe title={task.id} type='text/html' width="248" height="140" allowFullScreen="allowfullscreen" src={task.url} security="restricted"></iframe>
                    <div className="task-container-labels flex">
                        {task.labels.map(label => {
                            return <div key={label} className={label + ' small-label'}>
                            </div>
                        })
                        }
                    </div>
                    <p className="task-container-title">{task.title}</p>
                    {(showEditBtn && (onTaskId === task.id)) ?
                        <CreateIcon className="task-container-open-menu"
                            onClick={e => this.toggleMiniDetails(e)} />
                        : ''}
                </div>
            </section>
        )
    }
}