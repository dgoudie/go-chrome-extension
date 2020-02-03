import React, { Component } from 'react';
import List from './list/List';
import { getAllGoLinks, addGoLinks, deleteGoLink } from '../utils/storage';
import { GoLinkItem } from '../models/go-link-item';
import LinkSearcher from './link-searcher/LinkSearcher';
import styles from './App.module';
import NewGoLink from './new-go-link/NewGoLink';
import LinkManager from './link-manager/LinkManager';

class App extends Component {
    constructor(props) {
        super(props);
        getAllGoLinks().subscribe(goLinks => this.setState({ goLinks }));
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
        deleteGoLink(goLink).subscribe(newGoLinks =>
            this.setState({ goLinks: newGoLinks })
        );

    private _onGoLinkSubmitted = (goLink: GoLinkItem) =>
        addGoLinks([goLink]).subscribe(newGoLinks =>
            this.setState({ goLinks: newGoLinks })
        );
}

export default App;
