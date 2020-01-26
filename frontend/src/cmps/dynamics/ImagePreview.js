import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import utils from '../../services/utils'


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
        const maxWidth = 220;
        const maxHeight = 220; 

        const img = new Image();
        img.onload = _ => {

            if (img.width > img.height) {
                const heightRatio = maxHeight / img.height;
                const newWidth = img.width > maxWidth ? maxWidth : img.width;
                this.setState({
                    imgWidth: newWidth,
                    imgHeight: img.height * heightRatio,
                });
            } else {  
                const widthRatio = maxWidth / img.width;
                const newHeight = img.height > maxHeight ? maxHeight : img.height;
                this.setState({
                    imgWidth: img.width * widthRatio,
                    imgHeight: newHeight,
                });
            }
        }
        img.src = this.props.task.url;
    }

    toggleMiniDetails = ev => {
        ev.stopPropagation();
        const miniTask = {
            task: this.props.task,
            left: this.refs.ref.getBoundingClientRect().left,
            top: this.refs.ref.getBoundingClientRect().top,
            height: this.refs.ref.getBoundingClientRect().height,
            imgHeight: this.state.imgHeight,
            imgWidth: this.state.imgWidth,
            previewType: 'image',
            column: this.props.column
        };
        this.props.toggleMiniDetails(miniTask);
    }



    render() {
        const { task, provided, innerRef, isDragging, style, showEditBtn, onTaskId } = this.props;
        return (
            <section ref="ref">
                <div
                    className={"task-container flex column align center" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <img title={task.id} alt="task" width={this.state.imgWidth} height={this.state.imgHeight} src={task.url} />
                    <div className="task-container-labels flex">
                        {task.labels.map(label => {
                            return <div key={label} className={label + ' small-label'}>
                            </div>
                        })
                        }
                    </div>
                    <p className="task-container-title">{task.title}</p>
                    <div className={"flex align-center space-between" + (task.description === '' ? ' row-reverse' : '')}>
                        {(showEditBtn && (onTaskId === task.id)) ?
                            <CreateIcon className="task-container-open-menu"
                                onClick={e => this.toggleMiniDetails(e)} />
                            : ''}
                        {(task.description !== '') ?
                            <ListAltIcon /> : ''
                        }

                        <div className="flex">
                            {(task.taskTeamMembers.map(member => {
                                return <div key={member._id} className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: `${member.color}` }} >
                                    <div className="team-member-icon">
                                        <p className="flex align-center">
                                            {utils.createUserIcon(member.firstName,
                                                member.lastName)}
                                        </p>
                                    </div>
                                </div>
                            }))
                            }
                        </div>
                    </div>  
                </div>
            </section>
        )
    }
}