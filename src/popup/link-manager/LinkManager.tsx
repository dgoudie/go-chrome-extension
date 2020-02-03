import React, { Component } from 'react';
import NewGoLink from '../new-go-link/NewGoLink';
import LinkSearcher from '../link-searcher/LinkSearcher';
import styles from './LinkManager.module';
import { GoLinkItem } from '../../models/go-link-item';

interface Props {
    className?: string;
    onGoLinkSubmitted: (_: GoLinkItem) => void;
    onSearchTextChanged: (_: string) => void;
    goLinks: GoLinkItem[];
}

class LinkManager extends Component<Props, {}> {
    state = {
        addNewLinkSectionVisible: false
    };
    render() {
        const { addNewLinkSectionVisible } = this.state;
        return (
            <div className={`${this.props.className} ${styles.manager}`}>
                {addNewLinkSectionVisible ? (
                    <NewGoLink
                        goLinks={this.props.goLinks}
                        onGoLinkSubmitted={goLink => {
                            this.props.onGoLinkSubmitted(goLink);
                            this.setState({ addNewLinkSectionVisible: false });
                        }}
                        onAddNewLinkCancelled={() =>
                            this.setState({ addNewLinkSectionVisible: false })
                        }
                    />
                ) : (
                    <LinkSearcher
                        onSearchTextChanged={this.props.onSearchTextChanged}
                        onAddNewButtonClicked={() =>
                            this.setState({ addNewLinkSectionVisible: true })
                        }
                    />
                )}
            </div>
        );
    }
}

export default LinkManager;
