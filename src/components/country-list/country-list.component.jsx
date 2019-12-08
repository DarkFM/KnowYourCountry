import React from 'react';

import './country-list-styles.scss';
import CountryItem from '../country-item/country-item.component';

const SESSION_KEY = 'countries-list';

export class CountryList extends React.Component {
    state = {
        countries: [],
        isLoading: false
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        this.setState({ countries: await this.getSessionData() }, () => this.setState({ isLoading: false }));
    }

    persistToSession(data) {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    }

    async getSessionData() {
        let countries = JSON.parse(window.sessionStorage.getItem(SESSION_KEY));
        if (!countries) {
            countries = await this.getCountries();
            this.persistToSession(countries);
        }
        return countries;
    }

    async getCountries() {
        const request = new Request('https://restcountries.eu/rest/v2/all');
        const response = await fetch(request);
        const data = await response.json();
        return data;
    }

    render() {
        const { countries } = this.state;
        return (
            <div className="country-list">
                {countries.map(country => (
                    <CountryItem
                        key={country.alpha3Code}
                        countryName={country.name}
                        population={country.population}
                        capital={country.capital}
                        region={country.region}
                        flagImg={country.flag}
                    />
                ))}
            </div>
        );
    }
}

export default CountryList;
