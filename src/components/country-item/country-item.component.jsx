import React from 'react';
import { withRouter } from 'react-router-dom';

import { formatNumberWithCommas, isEmptyObject } from '../../utils/utils';

import './country-item.styles.scss';

export class CountryItem extends React.Component {
    static defaultProps = {
        countryName: 'Germany',
        population: 81770900,
        capital: 'Berlin',
        region: 'Europe',
        flagImg: 'sdsd'
    };

    render() {
        const {
            id,
            countryName,
            population,
            capital,
            region,
            flagImg,
            history,
            highlightDetails
        } = this.props;
        const formattedNumber = formatNumberWithCommas(population);
        const NO_INFO = 'Unknown';

        const { index, length } = highlightDetails || {};

        return (
            <div className="country-item" onClick={() => history.push(`/country/${id}`)}>
                {/* <div className="img-container" style={{ backgroundImage: `url(${flagImg})` }}> */}
                <div className="img-container">
                    <img src={flagImg} alt={countryName} />
                </div>
                <div className="details">
                    <header>
                        {(highlightDetails) ? (
                            <>
                                {countryName.substring(0, index)}
                                <span className="highlight">
                                    {countryName.substring(index, index + length)}
                                </span>
                                {countryName.substring(index + length)}
                            </>
                        ) : (
                            countryName
                        )}
                    </header>
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

export default withRouter(CountryItem);
