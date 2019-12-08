import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';

class App extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <div className="App">
                <Header />
                <HomePage />
            </div>
        );
    }
}

export default App;
