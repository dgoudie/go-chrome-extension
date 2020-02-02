import React, { Component } from 'react';
import styles from './NewGoLink.module';
import {
    Stack,
    FocusZone,
    FocusZoneTabbableElements
} from 'office-ui-fabric-react';

interface Props {
    className?: string;
    onAddNewLinkCancelled: () => void;
}

class NewGoLink extends Component<Props, {}> {
    shortNameRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <Stack
                className={`${this.props.className}`}
                tokens={{ childrenGap: 10 }}
            >
                <FocusZone
                    handleTabKey={FocusZoneTabbableElements.all}
                    isCircularNavigation={true}
                >
                    <div className={styles.input}>
                        <span>go/</span>
                        <input placeholder='...' ref={this.shortNameRef} />
                    </div>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <button
                            className={styles.cancelButton}
                            onClick={() => this.props.onAddNewLinkCancelled()}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.submitButton}
                            onClick={() => this.props.onAddNewLinkCancelled()}
                        >
                            Saved
                        </button>
                    </Stack>
                </FocusZone>
            </Stack>
        );
    }
    componentDidMount() {
        this.focusShortName();
    }

    focusShortName() {
        !!this.shortNameRef.current && this.shortNameRef.current.focus();
    }
}

export default NewGoLink;
