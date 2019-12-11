import React from 'react';

import './header.styles.scss';

class Header extends React.Component {
    state = {
        lightMode: false
    };

    toggleTheme = () => {
        this.setState({ lightMode: !this.state.lightMode });
    };

    componentDidUpdate(prevProps, prevState) {
        var html = document.querySelector('html');
        if (this.state.lightMode) {
            html.dataset['theme'] = 'dark';
        } else {
            html.dataset['theme'] = '';
        }
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <h3 className="title">Where in the world?</h3>
                    <span className="theme-switch" onClick={this.toggleTheme}>
                        {this.state.lightMode ? (
                            <>
                                <span className="mode-icon light-mode">
                                    <i className="fas fa-moon"></i>
                                </span>
                                Dark Mode
                            </>
                        ) : (
                            <>
                                <span className="mode-icon dark-mode">
                                    <i className="fas fa-sun"></i>
                                </span>
                                Light Mode
                            </>
                        )}
                    </span>
                </div>
            </header>
        );
    }
}
export default Header;
