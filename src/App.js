import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CountryDetailsPage from './pages/country-details-page/country-details-page.component';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/country/:countryId" component={CountryDetailsPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
