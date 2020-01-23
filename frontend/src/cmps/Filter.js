import React, { Component } from 'react'

import SearchIcon from '@material-ui/icons/Search';

export default class Filter extends Component {

    state = {
        filterBy: {
            title: ''
        }
    }

    inputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState(prevState => ({
            filterBy: {
                ...prevState.filterBy,
                [fieldName]: value
            }
        }));
    }

    onFilterClick = () => {
        this.props.onFilter(this.state.filterBy);
    }

    render() {
        return <div className="board-page-nav-bar-filters-item flex">
            <input type="text" placeholder="search task by name"
                value={this.state.filterBy.title}
                onChange={this.inputChange} name="title"></input>
            <button className="board-page-nav-bar-filters nav-btn"
                onClick={this.onFilterClick}>
                <SearchIcon className="flex" />
            </button>
        </div>
    }
}