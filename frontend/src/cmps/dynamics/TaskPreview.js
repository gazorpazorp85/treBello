import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';
// import moment from 'moment';
// import 'moment/locale/es'
// import Card from '@material-ui/core/Card';

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
        const pos = {
            left: this.state.elLeft,
            top: this.state.elTop,
            height: this.state.elHeight
        };
        this.props.toggleMiniDetails(pos);
    }

    render() {
        const { task, provided, innerRef, isDragging, style, onDelete, showEditBtn, onTaskId } = this.props;
        return (
            <section ref="ref">
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
                                onClick={e => this.toggleMiniDetails(e)} />
                        </div>
                        : ''}
                </div>
            </section>
        )
    }
}