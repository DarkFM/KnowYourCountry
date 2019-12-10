import React from 'react';
import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryList from '../../components/country-list/country-list.component';

import './homepage.styles.scss';
import { getAllRegions, SESSION_KEY, getSessionDataAsync, escapeRegExp } from '../../utils/utils';
import { COUNTRY_REGIONS } from '../../utils/constants';

class HomePage extends React.Component {
    state = {
        searchQuery: '',
        countries: {},
        region: ''
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        this.setState({ countries: await getSessionDataAsync(SESSION_KEY) }, () =>
            this.setState({ isLoading: false })
        );
    }

    resetQuery = null;

    updateSearchQuery = query => {
        if (!this.resetQuery) {
            this.resetQuery = this.setQueryString();
        }

        if (query.length >= 2) {
            this.resetQuery(query);
            this.setState({ searchQuery: query });
        } else {
            this.resetQuery('');
            this.setState({ searchQuery: '' });
        }
    };

    getRegionFilter = region => {
        this.setState({ region });
    };

    // acts as a debounce for the input on change event
    setQueryString = () => {
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
    };

    filterByRegion = (region, countries) => {
        // filter countries based on the search region
        const filteredCountries = countries.filter(country => {
            if (region == COUNTRY_REGIONS.All) {
                return true;
            } else {
                return country.region.toLowerCase().includes(region.toLowerCase());
            }
        });

        return filteredCountries;
    };

    filterBySearch = (query, countries) => {
        const filteredCountries = countries.filter(country => {
            const escapedQuery = escapeRegExp(this.state.searchQuery);
            const re = new RegExp(escapedQuery, 'gi');
            return re.test(country.name);
        });

        return filteredCountries;
    };

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

        const regions = ['All', ...getAllRegions(this.state.countries).sort()];

        const { countries } = this.state;

        const countriesKeys = Object.keys(countries);

        const allCountries = countriesKeys.map(countryId => countries[countryId]);

        const filteredCountries = this.filterBySearch(
            this.state.searchQuery,
            this.filterByRegion(this.state.region, allCountries)
        );

        return (
            <div className="homepage">
                <div className="menu">
                    <SearchBar filterCountries={this.updateSearchQuery} initQuery={query} />
                    <Dropdown dropdownItems={regions} getSelectedItem={this.getRegionFilter} />
                </div>
                {/* <CountryList countries={this.state.countries} searchQuery={query || this.state.searchQuery} /> */}
                <CountryList countries={filteredCountries} searchQuery={query || this.state.searchQuery} />
            </div>
        );
    }
}

export default HomePage;
