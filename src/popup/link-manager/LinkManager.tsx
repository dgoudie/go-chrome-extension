import React, { Component, Suspense } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import LinkSearcher from '../link-searcher/LinkSearcher';
import styles from './LinkManager.module';

// import NewGoLink from '../new-go-link/NewGoLink';
const NewGoLink = React.lazy(() => import('../new-go-link/NewGoLink'));

interface Props {
    className?: string;
    onGoLinkSubmitted: (_: GoLinkItem) => void;
    onSearchTextChanged: (_: string) => void;
    onOptionsMenuRequested: () => void;
    goLinks: GoLinkItem[];
}

class LinkManager extends Component<Props, {}> {
    state = {
        addNewLinkSectionVisible: false,
    };
    render() {
        const { addNewLinkSectionVisible } = this.state;
        return (
            <div className={`${this.props.className} ${styles.manager}`}>
                {addNewLinkSectionVisible ? (
                    <Suspense fallback={<div />}>
                        <NewGoLink
                            goLinks={this.props.goLinks}
                            onGoLinkSubmitted={(goLink) => {
                                this.props.onGoLinkSubmitted(goLink);
                                setTimeout(() => {
                                    this.setState({
                                        addNewLinkSectionVisible: false,
                                    });
                                }, 1500);
                            }}
                            onAddNewLinkCancelled={() =>
                                this.setState({
                                    addNewLinkSectionVisible: false,
                                })
                            }
                        />
                    </Suspense>
                ) : (
                    <LinkSearcher
                        onSearchTextChanged={this.props.onSearchTextChanged}
                        onAddNewButtonClicked={() =>
                            this.setState({ addNewLinkSectionVisible: true })
                        }
                        onOptionsMenuRequested={
                            this.props.onOptionsMenuRequested
                        }
                    />
                )}
            </div>
        );
    }
}

export default LinkManager;
