import React from 'react';

import './country-list-styles.scss';

import CountryItem from '../country-item/country-item.component';

import { getSessionDataAsync, SESSION_KEY, escapeRegExp } from '../../utils/utils';

export class CountryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            searchQuery: this.props.searchQuery
        };
    }

    render() {
        return (
            <div className="country-list">
                {this.props.countries.map(country => {
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
