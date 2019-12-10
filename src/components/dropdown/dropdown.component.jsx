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

    handleSelect = event => {
        const {
            target: {
                dataset: { value }
            }
        } = event;
        this.setState({ selectedItem: value });
        this.toggleDropdown();
        // call another function passed by parent
    };

    componentDidUpdate(prevProps, prevState) {
        const selectedItem = this.state.selectedItem;
        if (prevState.selectedItem !== selectedItem) {
            this.props.getSelectedItem(selectedItem);
        }
    }

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
                        {this.props.dropdownItems.map(region => (
                            <li
                                key={region}
                                onClick={this.handleSelect}
                                className="dropdown-item"
                                data-value={region}
                            >
                                {region}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Dropdown;
