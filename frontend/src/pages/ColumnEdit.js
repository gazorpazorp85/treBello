import React, { Component } from "react";
import { connect } from 'react-redux'

import { loadColumn } from '../actions/ColumnActions';


class ColumnEdit extends Component {

    componentDidMount() {
        const boardId = this.props.match.params.boardId;
        const columnId = this.props.match.params.columnId;
        this.props.loadColumn(boardId, columnId);
    }

    render() {
        return (
            <section className="TodoEdit-container">
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