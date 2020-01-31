import React, { Component } from 'react'

export default class Sort extends Component {

    state = {
        sortBy: '',
        sortOrder: 'asc'
    }

    inputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [fieldName]: value } }));
    }

    onSortBy = (ev) => {
        let fieldName = ev.target.name;
        let sortOrder = (this.state.sortOrder === 'asc') ? 'desc' : 'asc';
        this.setState({ sortBy: fieldName, sortOrder: sortOrder }, () => this.props.onSort(this.state.sortBy, this.state.sortOrder));
    }

    toggleButtonName = () => {
        return (this.state.sortOrder === 'asc') ? 'Newest Tasks' : 'Oldest Tasks';
    }

    render() {
        return <div  className="board-page-nav-bar-filters-item fill-height">
            <button className="nav-btn fill-height"
                onClick={this.onSortBy}
                style={{
                    color: (this.props.isDarkBackground) ? 'white' : 'black',
                    background: (this.props.isDarkBackground) ? '#00000094' : '#ffffff4f'
                  }}
                name='createdAt'>{this.toggleButtonName()}</button>

        </div>
    }
}