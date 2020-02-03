import React, { Component } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import { mergeStyleSets, Icon } from 'office-ui-fabric-react';
import styles from './List.module';
import Fuse, { FuseOptions } from 'fuse.js';

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
            <li className={styles.listItem} key={goLink.shortName}>
                <div>
                    <div className={styles.shortName}>
                        go/{goLink.shortName}
                    </div>
                    <div className={styles.fullLink}>{goLink.fullLink}</div>
                </div>
                <button
                    onClick={() => this.props.onGoLinkDeleted(goLink)}
                    className={styles.listItemDeleteButton}
                >
                    <Icon iconName='Cancel' />
                </button>
            </li>
        ));
        return (
            <ul className={`${styles.list} ${this.props.className}`}>
                {goLinkItems}
            </ul>
        );
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ fuse: new Fuse(nextProps.goLinks, FUSE_OPTIONS) });
    }
}
