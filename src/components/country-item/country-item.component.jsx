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
        if (num === 0) return '';
        return [...num.toString()].reverse().reduce((acc, n, idx) => {
            if (idx % 3 === 0 && idx !== 0) return n + ',' + acc;
            else return n + acc;
        });
    };

    render() {
        const { countryName, population, capital, region, flagImg } = this.props;
        const formattedNumber = this.formatNumber(population);
        const NO_INFO = 'Unknown';
        return (
            <div className="country-item">
                {/* <div className="img-container" style={{ backgroundImage: `url(${flagImg})` }}> */}
                <div className="img-container">
                    <img src={flagImg} alt={countryName} />
                </div>
                <div className="details">
                    <header>{countryName}</header>
                    <p className="country-detail">
                        <span className="detail-title">Population: </span>
                        <span className="detail-description">{formattedNumber || NO_INFO}</span>
                    </p>
                    <p className="country-detail">
                        <span className="detail-title">Region: </span>
                        <span className="detail-description">{region || NO_INFO}</span>
                    </p>
                    <p className="country-detail">
                        <span className="detail-title">Capital: </span>
                        <span className="detail-description">{capital || NO_INFO}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default CountryItem;
