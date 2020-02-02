import React, { Component } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import { mergeStyleSets, Icon } from 'office-ui-fabric-react';
import styles from './List.module';

interface Props {
    goLinks: GoLinkItem[];
    className?: string;
    onGoLinkDeleted: (_: GoLinkItem) => void;
}

export default class List extends Component<Props, {}> {
    render() {
        const goLinkItems = this.props.goLinks.map(goLink => (
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
}
