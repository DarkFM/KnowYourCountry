import React from 'react';
import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryList from '../../components/country-list/country-list.component';

import './homepage.styles.scss';

const HomePage = () => (
    <div className="homepage">
        <div className="menu">
            <SearchBar />
            <Dropdown />
        </div>
        <CountryList />
    </div>
);

export default HomePage;
