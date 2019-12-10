import React from 'react';

import { getSessionDataAsync, SESSION_KEY } from '../../utils/utils';

import CountryDetail from '../../components/country-details/country-details.component';

import './country-details-page.styles.scss';

class CountryDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            borders: [],
            countryId: this.props.match.params.countryId
        };
    }

    async componentDidMount() {
        const { match } = this.props;
        const countryId = match.params.countryId.toUpperCase();
        await this.updateState(countryId);
    }

    async componentDidUpdate(prevProps) {
        const prevCountryId = prevProps.match.params.countryId.toUpperCase();
        const countryId = this.props.match.params.countryId.toUpperCase();

        if (countryId !== prevCountryId) {
            await this.updateState(countryId);
        }
    }

    async updateState(countryId) {
        const countries = await getSessionDataAsync(SESSION_KEY);
        const country = countries[countryId];
        const borders = country.borders.map(countryCode => {
            return { name: countries[countryCode].name, code: countryCode };
        });
        this.setState(state => ({
            country,
            borders,
            countryId
        }));
    }

    render() {
        const { country, borders } = this.state;
        return (
            <div className="country-detail-page">
                <button className="go-back" onClick={() => this.props.history.push('/')}>
                    {' '}
                    &#10550; Back
                </button>
                {this.state.country && (
                    <CountryDetail borders={borders} country={country} countryId={this.state.countryId} />
                )}
            </div>
        );
    }
}

export default CountryDetailsPage;
