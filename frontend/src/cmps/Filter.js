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
        console.log(fieldName, value);
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
            <select name="teamMembers" onChange={this.inputChange}>
                <option value=''>All Team Members</option>
                {teamMembers.map(teamMember => (
                    <option key={teamMember._id} value={`${teamMember.username}`}>{teamMember.firstName} {teamMember.lastName}</option>
                ))}
            </select>
            <button className="board-page-nav-bar-filters nav-btn"
                onClick={this.onFilterClick}>
                <SearchIcon className="flex" />
            </button>
        </div>
    }
}