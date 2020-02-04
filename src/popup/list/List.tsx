import Fuse, { FuseOptions } from 'fuse.js';
import { Icon, mergeStyleSets } from 'office-ui-fabric-react';
import React, { Component } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import styles from './List.module';

const FUSE_OPTIONS: FuseOptions<GoLinkItem> = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['shortName', 'fullLink']
};

interface Props {
    goLinks: GoLinkItem[];
    className?: string;
    onGoLinkDeleted: (_: GoLinkItem) => void;
    searchText: string;
}

interface State {
    fuse: Fuse<GoLinkItem, FuseOptions<GoLinkItem>>;
}

export default class List extends Component<Props, State> {
    state = {
        fuse: new Fuse(this.props.goLinks, FUSE_OPTIONS)
    };

    render() {
        const { searchText, goLinks } = this.props;
        const goLinksToUse = !!searchText
            ? (this.state.fuse.search(searchText) as GoLinkItem[])
            : goLinks;
        const goLinkItems = goLinksToUse.map(goLink => (
            <button
                key={goLink.shortName}
                className={styles.listItem}
                onClick={() => chrome.tabs.create({ url: goLink.fullLink })}
            >
                <div className={styles.listItemInfo}>
                    <div className={styles.shortName}>
                        go/{goLink.shortName}
                    </div>
                    <div className={styles.fullLink}>{goLink.fullLink}</div>
                </div>
                <button
                    onClick={event =>
                        this._onDeleteButtonClicked(event, goLink)
                    }
                    className={styles.listItemDeleteButton}
                >
                    <Icon iconName="Cancel" />
                </button>
            </button>
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

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ fuse: new Fuse(nextProps.goLinks, FUSE_OPTIONS) });
    }
}
