import React, { Component } from "react";
// import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';

// import 'moment/locale/es'

export default class ImagePreview extends Component {
    state = {
        width: 220,
        height: 220
    }

    componentDidMount() {
        this.setImageRatio();
    }

    setImageRatio = _ => {
        const maxWidth = 220; // Max width for the image
        const maxHeight = 220; // Max height for the image
        const img = new Image();
        img.onload = _ => {
            // Check if the current width is larger than the max
            if (img.width > img.height) {
                const heightRatio = maxHeight / img.height;   // get ratio for scaling image
                const widthRatio = maxWidth / img.width;
                const newWidth = img.width > maxWidth ? img.width * widthRatio : img.width;
                this.setState({ width: newWidth, height: img.height * heightRatio });
            } else {  // Check if current height is larger than max
                const heightRatio = maxHeight / img.height;   // get ratio for scaling image
                const widthRatio = maxWidth / img.width;
                const newHeight = img.height > maxHeight ? img.height * heightRatio : img.height;
                this.setState({ width: img.width * widthRatio, height: newHeight });
            }
        }
        img.src = this.props.task.url;
    }


    render() {
        // const createdAtFormat = new Date(task.createdAt).toString();
        // const dueDateFormat = new Date(task.dueDate).toString();
        const { task, provided, innerRef, isDragging, style, onDelete, showEditBtn, onTaskId } = this.props;
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
                    <img title={task.id} alt="task" width={this.state.width} height={this.state.height} src={task.url} />
                    {(showEditBtn && (onTaskId === task.id)) ?
                        <div className="task-container-open-menu-wrapper flex align-center justify-center">
                            <CreateIcon className="task-container-open-menu"
                                onClick={onDelete} />
                        </div>
                        : ''}
                </Card>
            </section>
        )
    }
}