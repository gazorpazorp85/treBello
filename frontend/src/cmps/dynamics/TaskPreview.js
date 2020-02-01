import React, { Component } from "react";
import CreateIcon from '@material-ui/icons/Create';
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import utils from '../../services/utils'

export default class TaskPreview extends Component {
    constructor(props) {
        super(props);
        this.taskContainer = React.createRef();
    }


    toggleMiniDetails = ev => {
        ev.stopPropagation();
        const miniTask = {
            task: this.props.task,
            boundingClientRect: this.taskContainer.current.getBoundingClientRect(),
            previewType: 'text',
            column: this.props.column
        };
        this.props.toggleMiniDetails(miniTask);
    }

    render() {
        const { task, provided, innerRef, isDragging, style, showEditBtn, onTaskId } = this.props;
        return (
            <section ref={this.taskContainer}>
                <div
                    className={"task-container" + (isDragging ? " isDragging" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    style={style}
                >
                    <div className="task-container-labels flex wrap">
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

                    <div className={"bottom-container flex align-center " + (task.description === '' ? ' row-reverse' : '')}>

                        <div className="flex">
                            {(task.description !== '') ?
                                <SubjectIcon />
                                : ''
                            }

                            {(task.todos.length > 0) ?
                                <div className="flex align-center">
                                    <CheckBoxIcon />
                                    <p>{task.todosDone + '/' + task.todos.length}</p>
                                </div>
                                : ''
                            }
                        </div>


                        <div className="team-members-container flex">
                            {(task.taskTeamMembers.map(member => {
                                return <div key={member._id} className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6' }} >
                                    <div className="team-member-icon">
                                        <p className="flex align-center" style={{ color: '#172b4d' }}>
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