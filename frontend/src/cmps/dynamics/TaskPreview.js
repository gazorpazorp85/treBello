import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default class TaskPreview extends Component {

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
            previewType: 'text',
            column: this.props.column
        };
        this.props.toggleMiniDetails(miniTask);
    }

    render() {
        const { task, provided, innerRef, isDragging, style, showEditBtn, onTaskId } = this.props;
        return (
            <section ref="ref">
                <div
                    className={"task-container" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <div className="task-container-labels flex">
                        {
                            task.labels.map(label => {
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
                    {(task.description !== '') ?
                        <ListAltIcon /> : ''
                    }
                </div>


            </section>
        )
    }
}