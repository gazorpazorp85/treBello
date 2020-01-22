import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';

// import moment from 'moment';
// import 'moment/locale/es'

export default class ImagePreview extends Component {
    state = {
        imgWidth: 220,
        imgHeight: 220,
        isMiniDetailsOn: false,
        elTop: 0,
        elLeft: 0,
        elHeight: 0,
    }

    componentDidMount() {
        this.setNewState();
    }

    setNewState = _ => {
        const maxWidth = 220; // Max width for the image
        const maxHeight = 220; // Max height for the image
        // const ref = this.props.task.id;
        const img = new Image();
        img.onload = _ => {
            // Check if the current width is larger than the max
            if (img.width > img.height) {
                const heightRatio = maxHeight / img.height;   // get ratio for scaling image
                const newWidth = img.width > maxWidth ? maxWidth : img.width;
                this.setState({
                    imgWidth: newWidth,
                    imgHeight: img.height * heightRatio,
                    elTop: this.refs.ref.getBoundingClientRect().top + 1,
                    elLeft: this.refs.ref.getBoundingClientRect().left,
                    elHeight: this.refs.ref.getBoundingClientRect().height - 1
                });
            } else {  // Check if current height is larger than max
                const widthRatio = maxWidth / img.width;
                const newHeight = img.height > maxHeight ? maxHeight : img.height;
                this.setState({
                    imgWidth: img.width * widthRatio,
                    imgHeight: newHeight,
                    elTop: this.refs.ref.getBoundingClientRect().top + 1,
                    elLeft: this.refs.ref.getBoundingClientRect().left,
                    elHeight: this.refs.ref.getBoundingClientRect().height - 1
                });
            }
        }
        img.src = this.props.task.url;
    }

    toggleMiniDetails = ev => {
        ev.stopPropagation();
        const miniTask = {
            task: this.props.task,
            left: this.state.elLeft,
            top: this.state.elTop,
            height: this.state.elHeight,
            imgHeight: this.state.imgHeight,
            imgWidth: this.state.imgWidth,
            previewType: 'image'
        };
        this.props.toggleMiniDetails(miniTask);
    }



    render() {
        // const createdAtFormat = new Date(task.createdAt).toString();
        // const dueDateFormat = new Date(task.dueDate).toString();
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
                    <img title={task.id} alt="task" width={this.state.imgWidth} height={this.state.imgHeight} src={task.url} />
                    <p>{task.title}</p>
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