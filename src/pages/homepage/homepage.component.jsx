import React from 'react';

import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryList from '../../components/country-list/country-list.component';

import './homepage.styles.scss';

import {
    getAllRegions,
    SESSION_KEY,
    getSessionDataAsync,
    escapeRegExp,
    addQueryParam,
    queryStrToObj
} from '../../utils/utils';
import { COUNTRY_REGIONS } from '../../utils/constants';

const SEARCH_TRIGGER_LENGTH = 2;
const SEARCH_DELAY = 500; // in ms

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.resetQuery = this.setQueryString();

        const { location } = this.props;

        let searchQuery = '';
        let regionQuery = '';
        // check if url has query params
        // use the query params instead of state
        if (location.search.trim()) {
            // remove leading '?' character
            const queryParams = location.search.replace('?', '');
            const queryMap = queryStrToObj(queryParams);

            searchQuery = window.decodeURIComponent(queryMap['query'] || '');
            regionQuery = window.decodeURIComponent(queryMap['region'] || '');
        }

        this.state = {
            searchQuery,
            regionQuery,
            // countries: {},
            allRegions: [],
            countriesArray: []
        };
    }

    resetQuery = null;

    async componentDidMount() {
        const countries = await getSessionDataAsync(SESSION_KEY);
        const allRegions = ['All', ...getAllRegions(countries).sort()];
        // convert stored data from object to array of country object
        const countriesArray = Object.keys(countries).map(countryId => countries[countryId]);

        this.setState({
            // countries,
            allRegions,
            countriesArray
        });
    }

    updateSearchQuery = query => {
        // only trigger search when the query is up to the SEARCH_TRIGGER_LENGTH
        if (query.length >= SEARCH_TRIGGER_LENGTH) {
            this.resetQuery(query);
            this.setState({ searchQuery: query });
        } else {
            this.resetQuery('');
            this.setState({ searchQuery: '' });
        }
    };

    getRegionFilter = regionQuery => {
        this.setState({ regionQuery });
        const urlWithRegionParam = addQueryParam(window.location.search, 'region', regionQuery);
        this.props.history.push(urlWithRegionParam);
    };

    // acts as a debounce for the onChange input event
    // this minimizes the number of pages added to the browsers history
    setQueryString = () => {
        let timerId = null;

        return query => {
            window.clearTimeout(timerId);

            // generate query string and removes empty queries by default
            const urlWithQueryParam = addQueryParam(window.location.search, 'query', query);

            timerId = window.setTimeout(() => {
                this.props.history.push(urlWithQueryParam);
            }, SEARCH_DELAY);
        };
    };

    filterByRegion = (region, countries) => {
        // filter countries based on the search region
        const filteredCountries = countries.filter(country => {
            if (region === COUNTRY_REGIONS.All) {
                return true;
            } else {
                return country.region.toLowerCase().includes(region.toLowerCase());
            }
        });

        return filteredCountries;
    };

    filterBySearch = (query, countries) => {
        const queryLength = query.length;
        const filteredCountries = countries.filter(country => {
            const escapedQuery = escapeRegExp(query);
            const re = new RegExp(escapedQuery, 'gi');
            const index = country.name.search(re);

            // remove previous search results if any
            delete country.search;

            if (index < 0) {
                return false;
            }

            // adds a new property to the object only if a search query was made
            if (queryLength > 0) {
                country.search = {
                    index: index,
                    length: queryLength
                };
            }

            return true;
        });

        return filteredCountries;
    };

    render() {
        const { countriesArray, searchQuery, regionQuery } = this.state;

        const filteredCountries = this.filterBySearch(
            searchQuery,
            this.filterByRegion(regionQuery, countriesArray)
        );

        return (
            <div className="homepage">
                <div className="menu">
                    <SearchBar filterCountries={this.updateSearchQuery} initData={this.state.searchQuery} />
                    <Dropdown
                        dropdownItems={this.state.allRegions}
                        initData={this.state.regionQuery}
                        getSelectedItem={this.getRegionFilter}
                    />
                </div>
                <CountryList countries={filteredCountries} />
            </div>
        );
    }
}

export default HomePage;
