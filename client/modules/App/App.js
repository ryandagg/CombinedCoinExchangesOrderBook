/* globals window process */
import React, { Component, PropTypes } from 'react';
import styles from './App.css';
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { showDevTools: false };
    }

    componentDidMount() {
        this.setState({showDevTools: !window.devToolsExtension && process.env.NODE_ENV === 'development'});
    }

    render() {
        return (
            <div>
                {this.state.showDevTools && <DevTools/>}
                <div>
                    <Helmet
                        title="MERN Starter - Blog App"
                        titleTemplate="%s - Blog App"
                        meta={[
                            { charset: 'utf-8' },
                            {
                                'http-equiv': 'X-UA-Compatible',
                                content: 'IE=edge',
                            },
                            {
                                name: 'viewport',
                                content: 'width=device-width, initial-scale=1',
                            },
                        ]}
                    />
                    <Header/>
                    <div className={styles.container}>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
};


export default App;
