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
        goLinks: []
    };

    render() {
        const { goLinks } = this.state;
        return (
            <div className={styles.app}>
                <List
                    className={styles.list}
                    goLinks={goLinks}
                    onGoLinkDeleted={this._onGoLinkDeleted}
                />
                <LinkManager className={styles.manager} />
                {/* <Input
                    className={classes.input}
                    existingGoLinks={goLinks}
                    onGoLinkSubmitted={this._onGoLinkSubmitted}
                /> */}
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
