import React from 'react';
import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryList from '../../components/country-list/country-list.component';

import './homepage.styles.scss';

class HomePage extends React.Component {
    state = {
        searchQuery: ''
    };

    resetQuery = null;

    filterCountries = query => {
        if (!this.resetQuery) {
            this.resetQuery = this.setQueryString();
        }
        this.resetQuery(query);

        if (query.length >= 2) {
            this.setState({ searchQuery: query });
        } else {
            this.setState({ searchQuery: '' });
        }
    };

    setQueryString() {
        let timerId = null;

        return query => {
            window.clearTimeout(timerId);
            timerId = window.setTimeout(() => {
                if (query) {
                    this.props.history.push(`${this.props.match.url}?query=${query}`);
                } else {
                    this.props.history.push(`${this.props.match.url}`);
                }
            }, 500);
        };
    }

    render() {
        const { location } = this.props;
        let query = null;

        // check if url has query params
        // use the query params instead of state
        if (location.search.trim()) {
            let queryParam = location.search.split('&').find(query => query.includes('query='));
            if (queryParam) {
                query = queryParam.split('=')[1];
            }
        }

        return (
            <div className="homepage">
                <div className="menu">
                    <SearchBar filterCountries={this.filterCountries} initQuery={query} />
                    <Dropdown />
                </div>
                <CountryList searchQuery={query || this.state.searchQuery} />
            </div>
        );
    }
}

export default HomePage;
