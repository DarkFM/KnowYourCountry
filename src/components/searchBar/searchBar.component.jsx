import React from 'react';

import './searchBar.styles.scss';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: this.props.initData || ''
        };
    }
    static defaultProps = {
        placeholder: 'Search for a country...'
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    componentDidMount() {
        this.setState({ query: this.props.initData });
    }

    componentDidUpdate(prevProps, prevState) {
        const query = this.state.query;

        if (prevState.query !== query) {
            this.props.filterCountries(this.state.query.trim());
        }
    }

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
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                />
            </form>
        );
    }
}

export default SearchBar;
