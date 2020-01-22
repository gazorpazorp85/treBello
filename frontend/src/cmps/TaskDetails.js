import React, { Component } from 'react';

import Labels from './Labels'
// import TaskForm from './TaskForm';
// import ScreenFilter from './ScreenFilter'

// icons 
import TitleIcon from '@material-ui/icons/Title';
import NotesIcon from '@material-ui/icons/Notes';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CloseIcon from '@material-ui/icons/Close';


export default class TaskDetails extends Component {
    state = {
        description: '',
        showActivity: false,
        showEditDescriptionForm: false,
        teamMembers: [],
        deuDate: null,
        toggleChooseLabels: false,
        choosenlabels: []
        // saveBtnHidden: true
    }

    componentDidMount() {
        this.setState({ description: this.props.board.tasks[this.props.taskId].description });
    }

    emitChange = (ev) => {
        const targetValue = ev.target.value;
        this.setState({ description: targetValue });
    }

    toggleUpdateDescriptionForm = () => {
        this.setState(prevState => ({ showEditDescriptionForm: !prevState.showEditDescriptionForm }))
    }

    closeUpdateDescriptionForm = () => {
        this.setState({ toggleUpdateDescriptionForm: false })
    }

    onStopPropagationAndCloseOptions = (ev) => {
        ev.stopPropagation();
        this.setState({
            toggleChooseLabels: false
        })
    }

    toggleChooseLabels = (ev) => {
        ev.stopPropagation();
        this.setState(prevState => ({ toggleChooseLabels: !prevState.toggleChooseLabels }))
    }

    onSaveDescription = (task) => {
        const newTask = { ...task, description: this.state.description };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard);
    }


    render() {
        const task = this.props.board.tasks[this.props.taskId];
        const { column } = this.props;
        return (
            <div className="screen flex align-center justify-center" onClick={() => this.props.toggleTaskDetails()}>

                <div className="task-details-container flex" onClick={(ev) => this.onStopPropagationAndCloseOptions(ev)}>
                    <CloseIcon className="add-column-back-to-board   flex align-center"
                        onClick={() => this.props.toggleTaskDetails()} />
                    <div className="task-details-container-main full">
                        <header className="task-details-container-header">
                            <div className="flex">
                                <TitleIcon />
                                <h2>{task.title}</h2>
                            </div>
                            <div className="task-details-container-in-list flex">
                                <p className="flex">in list "{column.title}"</p>
                            </div>
                        </header>

                        <div className="task-details-container-lebels-container">

                            {this.state.toggleChooseLabels ?
                                <Labels
                                    toggleChooseLabels={this.toggleChooseLabels}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                /> : ''
                            }


                            {task.labels.length ?
                                <h2>labels:</h2> : ''
                            }
                            <div className="flex">

                                {
                                    task.labels.map(label => {
                                        return <div key={label} className={label + ' medium-label'}>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="task-details-container-main-description">
                            <div className="flex">
                                <NotesIcon />
                                <h2>Description</h2>
                            </div>
                            <div className="flex column text-area-wrapper" onClick={this.toggleUpdateDescriptionForm}>
                                <form onSubmit={this.save}>
                                    <textarea className="fill-width"
                                        name="description"
                                        rows="3"
                                        cols="40"
                                        onInput={this.emitChange}
                                        defaultValue={task.description}
                                        placeholder="Add a more detailed description...">
                                    </textarea>
                                </form>
                                {this.state.showEditDescriptionForm ?
                                    <div className="flex align-center">
                                        <button className="task-form-save-btn" onClick={() => this.onSaveDescription(task)}>SAVE</button>
                                        <CloseIcon className="task-form-back-btn" onClick={this.closeUpdateDescriptionForm} />
                                    </div> : ''
                                }
                            </div>
                        </div>

                        <div className="task-details-container-main-activity flex space-between">
                            <div className="flex">
                                <ListAltIcon />
                                <h2>Activity</h2>
                            </div>
                            <button>{this.state.showActivity ? 'Show Activity' : 'Hide Activity'}</button>
                        </div>
                    </div>


                    <div className="task-details-container-overall-options">
                        <div className="task-details-container-add-to-card-options-container">
                            <p className="text-center">ADD TO CARD</p>
                            <div className="task-details-container-add-to-card-options flex column">
                                <button className="task-details-container-add-to-card-options-btn btn" >Members</button>
                                <button className="task-details-container-add-to-card-options-btn btn" onClick={(ev) => this.toggleChooseLabels(ev)} >Labels</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Check List</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Due date</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Img</button>
                                <button className="task-details-container-add-to-card-options-btn btn" >Video</button>
                            </div>
                        </div>

                        <div className="task-details-container-actions-options-container">
                            <p className="text-center">ACTIONS</p>
                            <div className="task-details-container-actions-options-actions flex column">
                                <button className="task-details-container-actions-options-btn btn" >Move</button>
                                <button className="task-details-container-actions-options-btn btn" >Copy</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


