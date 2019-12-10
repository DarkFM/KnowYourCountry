import React from 'react';

import './country-list-styles.scss';

import CountryItem from '../country-item/country-item.component';

import { getSessionDataAsync, SESSION_KEY } from '../../utils/utils';

export class CountryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: {},
            isLoading: false,
            searchQuery: this.props.searchQuery
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        this.setState({ countries: await getSessionDataAsync(SESSION_KEY) }, () =>
            this.setState({ isLoading: false })
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newQuery = this.props.searchQuery;
        if (prevProps.searchQuery !== newQuery) {
            this.setState({ searchQuery: newQuery });
        }
    }

    render() {
        const { countries } = this.state;
        const countriesKeys = Object.keys(countries);

        // filter countries based on the search query
        const filteredCountries = countriesKeys.filter(countryId => {
            const country = countries[countryId];
            const re = new RegExp(this.props.searchQuery, 'gi');
            return re.test(country.name);
        });

        return (
            <div className="country-list">
                {filteredCountries.map(countryId => {
                    const country = countries[countryId];
                    return (
                        <CountryItem
                            key={country.alpha3Code}
                            id={country.alpha3Code}
                            countryName={country.name}
                            population={country.population}
                            capital={country.capital}
                            region={country.region}
                            flagImg={country.flag}
                        />
                    );
                })}
            </div>
        );
    }
}

export default CountryList;
