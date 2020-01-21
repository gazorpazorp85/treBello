import React, { Component } from 'react'

export default class Filter extends Component {

    state = {
        filterBy: {
            title: ''
        }
    }

    inputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = ev.target.value;
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [fieldName]: value } }));
    }

    onFilterClick = () => {
        this.props.onFilter(this.state.filterBy)
    }

    render() {
        return <div>
            <input type='text' placeholder='name' value={this.state.filterBy.title}
                onChange={this.inputChange} name='title'></input>
            {/* <select name='inStock' value={this.state.inStock} onChange={this.inputChange}>
                <option value=''>All</option>
                <option value='true'>In Stock</option>
                <option value='false'>Out of Stock</option>
            </select> */}
            <button onClick={this.onFilterClick}>Filter</button>
        </div>
    }
}