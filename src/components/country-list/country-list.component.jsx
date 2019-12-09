import React from 'react';

import './country-list-styles.scss';

import CountryItem from '../country-item/country-item.component';

import { getSessionDataAsync, SESSION_KEY } from '../../utils/utils';

export class CountryList extends React.Component {
    state = {
        countries: {},
        isLoading: false
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        this.setState({ countries: await getSessionDataAsync(SESSION_KEY) }, () =>
            this.setState({ isLoading: false })
        );
    }

    render() {
        const { countries } = this.state;
        const countriesArray = Object.keys(countries);
        return (
            <div className="country-list">
                {countriesArray.map(countryId => {
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
