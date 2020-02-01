import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

export default class Labels extends Component {
    state = {
        choosenLabels: []
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ choosenLabels: this.props.task.labels })
    }

    updateChoosenLabels = (ev) => {
        const label = ev.target.classList[0];
        const choosenLabels = this.state.choosenLabels;
        const labelIdx = choosenLabels.findIndex(currLabel => currLabel === label);
        let msg = '';
        let notificationType = '';
        if (labelIdx >= 0) {
            choosenLabels.splice(labelIdx, 1)
            msg = `A label was removed from the task '${this.props.task.title}'`;
            notificationType = 'danger';
        } else {
            choosenLabels.push(label);
            msg = `A label was added to the task '${this.props.task.title}'`;
            notificationType = 'success';
        }
        this.setState({ choosenLabels },() => this.onSave(msg, notificationType));
    }

    onSave = (msg, notificationType) => {
        const newTask = { ...this.props.task, labels: this.state.choosenLabels };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        let updateStyle = null;
        if (this.props.miniTask) {
            updateStyle = {
                left: 12 + 'px',
                top: 36 + 'px',
            }

        }

        return (
            <div className="labels-container text-center"
                onClick={(ev) => this.onStopPropagation(ev)}
                style={{ ...updateStyle }}
            >
                <CloseIcon className="labels-container-close-btn" onClick={this.props.toggleChooseLabels} />
                <p className="uppercase">choose labels</p>
                <hr />
                <div className="labels-container-colors-container flex column align-center ">
                    <div className="label-color-1 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className="label-color-2 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className="label-color-3 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className="label-color-4 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className="label-color-5 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className="label-color-6 large-label" onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                </div>
            </div>
        );

    }
}
