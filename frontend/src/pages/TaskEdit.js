import React, { Component } from "react";
import { connect } from 'react-redux'

import { loadTask } from '../actions';

// import ColumnForm from '../cmps/ColumnForm';

class ColumnEdit extends Component {

    componentDidMount() {
        const { columnId } = this.props.match.params;
        if (!columnId) return;
        this.props.loadColumn(columnId);
    }

    render() {
        return (
            <section className="TodoEdit-container">
                yes!
                {/* <ColumnForm {...this.props}/> */}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        column: state.column
    }
}

const mapDispatchToProps = ({
    loadColumn
})

export default connect(mapStateToProps, mapDispatchToProps)(ColumnEdit)