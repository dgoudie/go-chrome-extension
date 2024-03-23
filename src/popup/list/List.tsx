import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fuse from 'fuse.js';
import { GoLinkItem } from '../../models/go-link-item.js';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import styles from './List.module';

const FUSE_OPTIONS: Fuse.IFuseOptions<GoLinkItem> = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['shortName', 'fullLink'],
};

interface Props {
  className?: string;
  onGoLinkDeleted: (_: GoLinkItem) => void;
  searchText: string;
}

interface State {
  goLinks: GoLinkItem[];
  fuse: Fuse<GoLinkItem>;
}

export default class List extends Component<Props, State> {
  state = {
    goLinks: [] as GoLinkItem[],
    fuse: new Fuse([], FUSE_OPTIONS),
  };

  render() {
    const { goLinks } = this.state;
    const { searchText } = this.props;
    let goLinksToUse = goLinks;
    if (searchText) {
      goLinksToUse = this.state.fuse.search(searchText).map(({ item }) => item);
    }
    const goLinkItems = goLinksToUse.map((goLink) => (
      <div key={goLink.id} className={styles.listItem}>
        <div className={styles.listItemInfo}>
          <div className={styles.shortName}>go/{goLink.shortName}</div>
          <div className={styles.fullLink}>{goLink.fullLink}</div>
        </div>
        <button
          onClick={(event) => this._onDeleteButtonClicked(event, goLink)}
          className={styles.listItemDeleteButton}
        >
          <FontAwesomeIcon className={styles.inputIcon} icon={faTimes} />
        </button>
      </div>
    ));
    return (
      <div className={`${styles.list} ${this.props.className}`}>
        {goLinkItems}
      </div>
    );
  }

  _onDeleteButtonClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    goLink: GoLinkItem
  ) => {
    event.stopPropagation();
    this.props.onGoLinkDeleted(goLink);
  };

  public setGoLinksInitializeFuse = (goLinks: GoLinkItem[]) => {
    this.setState({ goLinks, fuse: new Fuse(goLinks, FUSE_OPTIONS) });
  };
}
