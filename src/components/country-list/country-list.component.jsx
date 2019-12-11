import React from 'react';

import './country-list-styles.scss';

import CountryItem from '../country-item/country-item.component';

export class CountryList extends React.Component {
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
                            highlightDetails={country.search}
                        />
                    );
                })}
            </div>
        );
    }
}

export default CountryList;
