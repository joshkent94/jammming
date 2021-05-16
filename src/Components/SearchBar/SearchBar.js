import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            term: null
        }
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        let search = e.target.value;
        this.setState({term: search});
    }

    handleKeyPress(e) {
        if(e.key === 'Enter') {
            this.search();
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" onChange={this.handleTermChange} onKeyDown={this.handleKeyPress} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
};