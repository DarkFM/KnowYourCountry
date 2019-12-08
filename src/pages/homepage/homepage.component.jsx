import React from 'react';
import SearchBar from '../../components/searchBar/searchBar.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import CountryItem from '../../components/country-item/country-item.component';
import CountryList from '../../components/country-list/country-list.component';

const HomePage = () => (
    <div className="homepage">
        <SearchBar />
        <Dropdown />
        <CountryList />
    </div>
);

export default HomePage;
