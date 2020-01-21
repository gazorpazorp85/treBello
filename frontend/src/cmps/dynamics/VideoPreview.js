import React, { Component } from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';

// import 'moment/locale/es'

export default class VideoPreview extends Component {
    // const createdAtFormat = new Date(task.createdAt).toString();
    // const dueDateFormat = new Date(task.dueDate).toString();
    state = {
        elTop: 0,
        elLeft: 0,
        elHeight: 0,
    }

    componentDidMount() {
        this.setNewState();
    }

    setNewState = _ => {
        this.setState({
            elTop: this.refs.ref.getBoundingClientRect().top + 1,
            elLeft: this.refs.ref.getBoundingClientRect().left,
            elHeight: this.refs.ref.getBoundingClientRect().height - 1
        });
    }

    toggleMiniDetails = ev => {
        ev.stopPropagation();
        const miniTask = {
            task: this.props.task,
            left: this.state.elLeft,
            top: this.state.elTop,
            height: this.state.elHeight
        };
        this.props.toggleMiniDetails(miniTask);
    }


    render() {
        const { task, provided, innerRef, isDragging, style, showEditBtn, onTaskId } = this.props;
        return (
            <section ref="ref">
                <Card
                    className={"task-container" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <p>{task.title}</p>
                    <iframe title={task.id} type='text/html' width="240" height="135" src={task.url}></iframe>
                    {(showEditBtn && (onTaskId === task.id)) ?
                        <div className="task-container-open-menu-wrapper flex align-center justify-center">
                            <CreateIcon className="task-container-open-menu"
                                onClick={e => this.toggleMiniDetails(e)} />
                        </div>
                        : ''}
                </Card>
            </section>
        )
    }
}