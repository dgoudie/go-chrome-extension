import React, { Component } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import { mergeStyleSets } from 'office-ui-fabric-react';

interface Props {
    goLinks: GoLinkItem[];
}

interface State {
    classes: ReturnType<typeof buildClasses>;
}

export default class List extends Component<Props, {}> {
    state = {
        classes: buildClasses()
    };
    render() {
        const { classes } = this.state;
        const goLinkItems = this.props.goLinks.map(goLink => (
            <li className={classes.listItem} key={goLink.shortName}>
                <div>go/{goLink.shortName}</div>
                <div>{goLink.fullLink}</div>
            </li>
        ));
        return <ul className={classes.list}>{goLinkItems}</ul>;
    }

    private _onItemInvoked = (item: GoLinkItem): void => {
        alert(`Item invoked: ${item.fullLink}`);
    };
}

// Styles

const buildClasses = () =>
    mergeStyleSets({
        list: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            minWidth: 500
        },
        listItem: {
            padding: 8,
            selectors: {
                ':not(:last-child)': {
                    borderBottom: '1px solid lightgray'
                }
            }
        }
    });
