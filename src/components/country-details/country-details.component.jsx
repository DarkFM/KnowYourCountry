import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { formatNumberWithCommas } from '../../utils/utils';
import './country-details.styles.scss';

class CountryDetail extends React.Component {
    render() {
        const {
            name,
            flag,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies: _currencies,
            languages: _languages
        } = this.props.country || {};
        const { borders: _borders } = this.props;

        const borders = _borders.length > 0 ? _borders : [{ name: 'None', code: this.props.countryId }];
        const currencies = _currencies.map(curr => curr.name);
        const languages = _languages.map(lang => lang.name);

        return (
            <div className="country-details">
                <div className="country-img">
                    <img src={flag} alt={`flag of ${name}`} />
                </div>
                <div className="details-container">
                    <header>{name}</header>
                    <div className="details">
                        <p className="country-detail">
                            <span className="detail-title">Native Name: </span>
                            <span className="detail-description">{nativeName}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Population: </span>
                            <span className="detail-description">{formatNumberWithCommas(population)}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Region: </span>
                            <span className="detail-description">{region}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Sub Region: </span>
                            <span className="detail-description">{subregion}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Capital: </span>
                            <span className="detail-description">{capital}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Top Level Domain: </span>
                            <span className="detail-description">{topLevelDomain}</span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Currencies: </span>
                            <span className="detail-description">
                                {currencies.length > 0 && currencies.join(', ')}
                            </span>
                        </p>
                        <p className="country-detail">
                            <span className="detail-title">Languages: </span>
                            <span className="detail-description">
                                {languages.length > 0 && languages.join(', ')}
                            </span>
                        </p>
                    </div>
                    <div className="country-tags">
                        <span className="detail-title">Border Countries: </span>
                        <div className="tag-container">
                            {borders.length > 0 &&
                                borders.map(country => (
                                    <Link
                                        to={`/country/${country.code}`}
                                        key={country.code}
                                        className="tag"
                                        // onClick={() => this.handleClick(country.code)}
                                    >
                                        {country.name}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CountryDetail);
