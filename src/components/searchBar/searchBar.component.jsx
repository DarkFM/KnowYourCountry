import React from 'react';

import './searchBar.styles.scss';

class SearchBar extends React.Component {
    static defaultProps = {
        placeholder: 'Search for a country...'
    };

    state = {
        query: ''
    };

    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    render() {
        const { placeholder } = this.props;
        return (
            <form className="search-bar">
                <i className="fas fa-search"></i>
                <input
                    className="search-input"
                    name="query"
                    type="search"
                    aria-label={placeholder}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                />
            </form>
        );
    }
}

export default SearchBar;
