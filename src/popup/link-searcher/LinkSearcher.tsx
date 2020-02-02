import React, { Component } from 'react';

import styles from './LinkSearcher.module';
import { Icon, Stack } from 'office-ui-fabric-react';

interface Props {
    onAddNewButtonClicked: () => void;
}

class LinkSearcher extends Component<Props, {}> {
    searchRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <Stack tokens={{ childrenGap: 10 }}>
                <div className={styles.input}>
                    <Icon className={styles.inputIcon} iconName='Search' />
                    <input
                        placeholder='Search Go Links...'
                        ref={this.searchRef}
                    />
                </div>
                <div className={styles.divider}></div>
                <div className={styles.buttonWrapper}>
                    <div
                        className={styles.button}
                        onClick={() => this.props.onAddNewButtonClicked()}
                    >
                        Create Go Link
                    </div>
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
