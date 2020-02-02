import React, { Component } from 'react';
import NewGoLink from '../new-go-link/NewGoLink';
import LinkSearcher from '../link-searcher/LinkSearcher';
import styles from './LinkManager.module';

interface Props {
    className?: string;
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
                    <NewGoLink />
                ) : (
                    <LinkSearcher
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
