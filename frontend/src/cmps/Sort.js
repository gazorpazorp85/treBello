import React, { Component } from 'react'

export default class Sort extends Component {

    state = {
        sortBy: '',
        sortOrder: ''
    }

    onSortBy = (ev) => {
        let fieldName = ev.target.name;
        this.setState({ sortBy: fieldName, sortOrder: ev.target.value }, () => this.props.onSort(this.state.sortBy, this.state.sortOrder));
    }

    render() {
        return (
            <div className="board-page-nav-bar-filters-item all-filters flex">
                <select
                    name="createdAt"
                    style={{
                        color: (this.props.isDarkBackground) ? 'white' : 'black',
                        background: (this.props.isDarkBackground) ? '#0000006b' : '#ffffff8e'
                    }}
                    onChange={this.onSortBy}
                >
                    <option value="">Sort By</option>
                    <option value="desc">Newest Cards</option>
                    <option value="asc">Oldest Cards</option>
                </select>
            </div>
        )
    }
}