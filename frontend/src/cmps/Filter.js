import React, { Component } from 'react'

import SearchIcon from '@material-ui/icons/Search';

export default class Filter extends Component {

    state = {
        filterBy: {
            title: '',
            teamMembers: ''
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

        const teamMembers = this.props.teamMembers;

        return <div className="board-page-nav-bar-filters-item flex">
            <input type="text" placeholder="Search task by name"
                value={this.state.filterBy.title}
                onChange={this.inputChange} name="title">
            </input>
            <div className="board-page-nav-bar-filters-divider"></div>
            <select name="teamMembers" onChange={this.inputChange}>
                <option className="capitalize" value=''>all team members</option>
                {teamMembers.map(teamMember => (
                    <option className="capitalize" key={teamMember._id} value={`${teamMember.username}`}>{teamMember.firstName} {teamMember.lastName}</option>
                ))}
            </select>
            <button className="board-page-nav-bar-filters nav-btn search-btn"
                onClick={this.onFilterClick}>
                <SearchIcon className="flex" />
            </button>
        </div>
    }
}