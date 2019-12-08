import React from 'react';

import './dropdown.styles.scss';

class Dropdown extends React.Component {
    state = {
        showItems: false,
        selectedItem: null
    };

    toggleDropdown = () => {
        this.setState(state => ({ showItems: !state.showItems }));
    };

    handleSelect = ({
        target: {
            dataset: { value }
        }
    }) => {
        this.setState({ selectedItem: value });
        this.toggleDropdown();
        // call another function passed by parent
    };

    render() {
        const { showItems, selectedItem } = this.state;

        return (
            <div className="dropdown">
                <div className="toggle-list" onClick={this.toggleDropdown}>
                    <span className="title-text">{selectedItem || 'Filter by Region'}</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {showItems && (
                    <ul className="dropdown-items">
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="All Regions">
                            All Regions
                        </li>
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="Africa">
                            Africa
                        </li>
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="America">
                            America
                        </li>
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="Asia">
                            Asia
                        </li>
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="Eurpoe">
                            Eurpoe
                        </li>
                        <li onClick={this.handleSelect} className="dropdown-item" data-value="Oceania">
                            Oceania
                        </li>
                    </ul>
                )}
            </div>
        );
    }
}

export default Dropdown;
