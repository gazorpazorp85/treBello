import React, { Component } from 'react'

export default class TopMenuOptions extends Component {

    render() {

        const column = { ...this.props.column }
        return <div className="top-menu-options">

            {/* <div className="title-contaner"> */}
            <h2 className="text-center">options menu</h2>
            {/* </div> */}
            <div className="options-container flex column">
                <p>rename list</p>
                <p>copy</p>
                <p onClick={() => this.props.onDelete(column.id)}>delete</p>
            </div>

        </div>
    }
}