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
            <input type="text" placeholder="search task by name"
                value={this.state.filterBy.title}
                onChange={this.inputChange} name="title">
            </input>
            <select name="teamMembers" value={this.state.filterBy.teamMembers} onChange={this.inputChange}>
                <option value=''>All Team Members</option>
                {teamMembers.map(teamMember => (
                    <option key={teamMember.userName} value={`${teamMember.userName}`}>{teamMember.firstName} {teamMember.lastName}</option>
                ))}
            </select>
            <button className="board-page-nav-bar-filters nav-btn"
                onClick={this.onFilterClick}>
                <SearchIcon className="flex" />
            </button>
        </div>
    }
}