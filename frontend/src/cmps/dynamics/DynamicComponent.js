import React, { Component } from 'react';

import mapDynamicComponents from "./mapDynamicComponents"

export default class DynamicComponent extends Component {
    state = {
        componentType: 'text',
    }

    componentDidMount() {
        this.setState({ componentType: this.props.task.type });
    }

    getComponent() {
        return mapDynamicComponents[this.state.componentType];
    }

    onDelete = ev => {
        ev.stopPropagation();
        this.props.onDelete(this.props.task.id);
    }

    render() {
        const Cmp = this.getComponent();
        return <React.Fragment>
            <Cmp
                provided={this.props.provided}
                innerRef={this.props.innerRef}
                task={this.props.task}
                isDragging={this.props.isDragging}
                style={this.props.style}
                onDelete={this.onDelete}
            >
            </Cmp>
        </React.Fragment>
    }
}