import React, { Component } from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';


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
            height: this.state.elHeight,
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
                    className={"task-container flex column align-center" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <iframe title={task.id} type='text/html' width="248" height="140" src={task.url} security="restricted"></iframe>
                    <div className="task-container-labels flex">
                        {task.labels.map(label => {
                            return <div key={label} className={label + ' small-label'}>
                            </div>
                        })
                        }
                    </div>
                    <p>{task.title}</p>
                    {(showEditBtn && (onTaskId === task.id)) ?
                        <div className="task-container-open-menu-wrapper flex align-center justify-center">
                            <CreateIcon className="task-container-open-menu"
                                onClick={e => this.toggleMiniDetails(e)} />
                        </div>
                        : ''}
                </div>
            </section>
        )
    }
}