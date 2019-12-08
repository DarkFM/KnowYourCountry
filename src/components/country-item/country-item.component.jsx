import React from 'react';

import './country-item.styles.scss';

export class CountryItem extends React.Component {
    static defaultProps = {
        countryName: 'Germany',
        population: 81770900,
        capital: 'Berlin',
        region: 'Europe',
        flagImg: 'sdsd'
    };

    formatNumber = num => {
        if (num < 0) return null;
        if (num == 0) return 0;

        const hundreds = (num % 1000).toString();
        const rest = Math.trunc(num / 1000);
        const returnValue = this.formatNumber(rest);
        if (returnValue) return returnValue + ',' + hundreds;
        else return hundreds;
    };

    render() {
        const { countryName, population, capital, region, flagImg } = this.props;
        const formattedNumber = this.formatNumber(population);
        return (
            <div className="country-item">
                <div className="img-container">
                    <img src={flagImg} />
                </div>
                <div className="details">
                    <header>{countryName}</header>
                    <p className="country-detail">
                        <span className="detail-title">Population: </span>
                        <span className="detail-description">{formattedNumber}</span>
                    </p>
                    <p className="country-detail">
                        <span className="detail-title">Region: </span>
                        <span className="detail-description">{region}</span>
                    </p>
                    <p className="country-detail">
                        <span className="detail-title">Capital: </span>
                        <span className="detail-description">{capital}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default CountryItem;
