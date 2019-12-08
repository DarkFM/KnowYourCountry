import React from 'react';
import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryItem from '../../components/country-item/country-item.component';

const HomePage = () => (
    <div className="homepage">
        <SearchBar />
        <Dropdown />
        <CountryItem />
    </div>
);

export default HomePage;
