import React, { Component } from 'react';
import { addGoLinks, deleteGoLink, getAllGoLinks } from '../utils/storage';

import { GoLinkItem } from '../models/go-link-item';
import LinkManager from './link-manager/LinkManager';
import List from './list/List';
import styles from './App.module';

class App extends Component {
    constructor(props) {
        super(props);
        getAllGoLinks().then(goLinks => this.setState({ goLinks }));
    }
    state = {
        searchText: '',
        goLinks: []
    };

    render() {
        const { goLinks, searchText } = this.state;
        return (
            <div className={styles.app}>
                <List
                    searchText={searchText}
                    className={styles.list}
                    goLinks={goLinks}
                    onGoLinkDeleted={this._onGoLinkDeleted}
                />
                <LinkManager
                    onSearchTextChanged={text =>
                        this.setState({ searchText: text })
                    }
                    className={styles.manager}
                    onGoLinkSubmitted={this._onGoLinkSubmitted}
                    goLinks={goLinks}
                />
            </div>
        );
    }

    private _onGoLinkDeleted = (goLink: GoLinkItem) =>
        deleteGoLink(goLink).then(newGoLinks =>
            this.setState({ goLinks: newGoLinks })
        );

    private _onGoLinkSubmitted = (goLink: GoLinkItem) =>
        addGoLinks([goLink]).then(newGoLinks =>
            this.setState({ goLinks: newGoLinks })
        );
}

export default App;
