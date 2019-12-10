import React from 'react';

import './header.styles.scss';

const Header = () => (
    <header className="header">
        <div className="container">
            <h3 className="title">Where in the world?</h3>
            <span className="theme-switch">Dark Mode</span>
        </div>
    </header>
);

export default Header;
