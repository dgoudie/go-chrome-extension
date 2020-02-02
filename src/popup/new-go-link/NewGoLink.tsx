import React, { Component } from 'react';
import styles from './NewGoLink.module';
import { Stack, FocusZone } from 'office-ui-fabric-react';

interface Props {
    className?: string;
}

class NewGoLink extends Component<Props, {}> {
    shortNameRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <Stack
                className={`${this.props.className}`}
                tokens={{ childrenGap: 10 }}
            >
                <FocusZone allowTabKey={true}>
                    <div className={styles.input}>
                        <span>go/</span>
                        <input placeholder='...' ref={this.shortNameRef} />
                    </div>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <Stack.Item grow={1} className={styles.cancelButton}>
                            <button></button>
                        </Stack.Item>
                        <Stack.Item grow={1} className={styles.submitButton}>
                            Save
                        </Stack.Item>
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
