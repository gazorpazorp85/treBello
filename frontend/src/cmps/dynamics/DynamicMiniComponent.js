import React, { Component } from 'react';

import mapDynamicMiniComponents from "./mapDynamicMiniComponents"

export default class DynamicMiniComponent extends Component {
    state = {
        previewType: 'text'
    }

    componentDidMount() {
        this.setState({ previewType: this.props.miniTask.previewType });
    }

    getComponent() {
        return mapDynamicMiniComponents[this.state.previewType];
    }

    render() {
        const Cmp = this.getComponent();
        return <React.Fragment>
            <Cmp
                miniTask={this.props.miniTask}
                updateBoard={this.props.updateBoard}
                onToggle={this.props.onToggle}
                board={this.props.board}
                user={this.props.user}
            >
            </Cmp>
        </React.Fragment>
    }
}