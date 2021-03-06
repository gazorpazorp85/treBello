import React, { Component } from 'react'

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
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [fieldName]: value } }), () => this.props.filterBoard(this.state.filterBy));
    }


    render() {
        const teamMembers = this.props.teamMembers;
        return <div className="board-page-nav-bar-filters-item all-filters flex">


            <input type="text" placeholder="Search card by name"
                value={this.state.filterBy.title}
                onChange={this.inputChange} name="title">
            </input>

            <div style={{ background: (this.props.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>
            <select name="teamMembers" style={{
                color: (this.props.isDarkBackground) ? 'white' : 'black',
                background: (this.props.isDarkBackground) ? '#0000006b' : '#ffffff8e'
            }} onChange={this.inputChange}>
                <option value=''>all team</option>
                {teamMembers.map(teamMember => (
                    <option className="capitalize" key={teamMember._id} value={`${teamMember.username}`}>{teamMember.firstName} {teamMember.lastName}</option>
                ))}
            </select>
        </div>
    }

}