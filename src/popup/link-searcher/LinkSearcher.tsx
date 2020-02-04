import { Icon, Stack } from 'office-ui-fabric-react';
import React, { Component } from 'react';

import styles from './LinkSearcher.module';

interface Props {
    onAddNewButtonClicked: () => void;
    onSearchTextChanged: (_: string) => void;
}

class LinkSearcher extends Component<Props, {}> {
    searchRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <Stack tokens={{ childrenGap: 10 }}>
                <div className={styles.input}>
                    <Icon className={styles.inputIcon} iconName="Search" />
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
            </Stack>
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
