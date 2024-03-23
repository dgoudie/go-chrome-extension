import React, { Component } from 'react';
import { addGoLinks, deleteGoLink, getAllGoLinks } from '../utils/storage';

import { GoLinkItem } from '../models/go-link-item';
import LinkManager from './link-manager/LinkManager';
import List from './list/List';
import OptionsMenu from './options-menu/OptionsMenu';
import styles from './App.module';

class App extends Component {
  listRef = React.createRef<List>();

  constructor(props) {
    super(props);
    getAllGoLinks().then((goLinks) => {
      this.sendGoLinksToList(goLinks);
      this.setState({ goLinks });
    });
  }
  state = {
    searchText: '',
    goLinks: [],
    optionsVisible: false,
  };

  render() {
    const { goLinks, searchText } = this.state;
    return (
      <div className={styles.app}>
        <List
          ref={this.listRef}
          searchText={searchText}
          className={styles.list}
          onGoLinkDeleted={this._onGoLinkDeleted}
        />
        <LinkManager
          onSearchTextChanged={(text) => this.setState({ searchText: text })}
          className={styles.manager}
          onGoLinkSubmitted={this._onGoLinkSubmitted}
          goLinks={goLinks}
          onOptionsMenuRequested={() => this.setState({ optionsVisible: true })}
        />
        {this.state.optionsVisible && (
          <OptionsMenu
            goLinks={goLinks}
            onGoLinksAdded={this._onGoLinksAdded}
            onClose={() => this.setState({ optionsVisible: false })}
          />
        )}
      </div>
    );
  }

  private _onGoLinkDeleted = (goLink: GoLinkItem) =>
    deleteGoLink(goLink).then((newGoLinks) => {
      this.sendGoLinksToList(newGoLinks);
      this.setState({ goLinks: newGoLinks });
    });

  private _onGoLinkSubmitted = (goLink: GoLinkItem) =>
    this._onGoLinksAdded([goLink]);

  private _onGoLinksAdded = (goLinks: GoLinkItem[]) =>
    addGoLinks(goLinks).then((newGoLinks) => {
      this.sendGoLinksToList(newGoLinks);
      this.setState({ goLinks: newGoLinks });
    });

  private sendGoLinksToList = (goLinks: GoLinkItem[]) => {
    !!this.listRef.current &&
      this.listRef.current.setGoLinksInitializeFuse(goLinks);
  };
}

export default App;
