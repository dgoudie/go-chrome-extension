import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import styles from './LinkSearcher.module';

interface Props {
    onAddNewButtonClicked: () => void;
    onSearchTextChanged: (_: string) => void;
}

class LinkSearcher extends Component<Props, {}> {
    searchRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <div className={styles.linkSearcher}>
                <div className={styles.input}>
                    <FontAwesomeIcon
                        className={styles.inputIcon}
                        icon={faSearch}
                    />
                    <input
                        placeholder="Search Go Links..."
                        ref={this.searchRef}
                        onChange={event =>
                            this.props.onSearchTextChanged(event.target.value)
                        }
                    />
                </div>
                <div className={styles.divider}></div>
                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.button}
                        onClick={() => this.props.onAddNewButtonClicked()}
                    >
                        Create Go Link
                    </button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.focusShortName();
    }

    focusShortName() {
        !!this.searchRef.current && this.searchRef.current.focus();
    }
}

export default LinkSearcher;
