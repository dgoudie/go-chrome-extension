import React, { Component } from 'react';
import styles from './NewGoLink.module';
import {
    Stack,
    FocusZone,
    FocusZoneTabbableElements
} from 'office-ui-fabric-react';
import { GoLinkItem } from '../../models/go-link-item';

const HTTP_REGEX = /https?:\/\//i;
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

interface Props {
    className?: string;
    onAddNewLinkCancelled: () => void;
    goLinks: GoLinkItem[];
    onGoLinkSubmitted: (_: GoLinkItem) => void;
}

interface State {
    tempSaved: boolean;
    shortName: string;
    fullLink: string;
}

class NewGoLink extends Component<Props, State> {
    state = {
        tempSaved: false,
        shortName: '',
        fullLink: ''
    };

    shortNameRef = React.createRef<HTMLInputElement>();
    render() {
        const { tempSaved, shortName, fullLink } = this.state;
        const {
            shortNameErrorMessage,
            fullLinkErrorMessage
        } = this._validateState(this.state);
        const {
            shortNameErrorMessageClasses,
            shortNameInputClasses,
            fullLinkErrorMessageClasses,
            fullLinkInputClasses
        } = this.buildClassLists(this.state);
        console.log(fullLinkErrorMessageClasses);
        return (
            <Stack
                className={`${this.props.className}`}
                tokens={{ childrenGap: 10 }}
            >
                <FocusZone
                    handleTabKey={FocusZoneTabbableElements.all}
                    isCircularNavigation={true}
                >
                    <div className={shortNameInputClasses.join(' ')}>
                        <span className={styles.inputGoSpan}>go/</span>
                        <input
                            value={shortName}
                            placeholder='...'
                            ref={this.shortNameRef}
                            onChange={(event: any) =>
                                this.setState({ shortName: event.target.value })
                            }
                        />
                        <span
                            className={shortNameErrorMessageClasses.join(' ')}
                        >
                            {shortNameErrorMessage}
                        </span>
                    </div>
                    <div className={fullLinkInputClasses.join(' ')}>
                        <input
                            value={fullLink}
                            placeholder='google.com'
                            onChange={(event: any) =>
                                this.setState({
                                    fullLink: event.target.value
                                })
                            }
                        />
                        <span className={fullLinkErrorMessageClasses.join(' ')}>
                            {fullLinkErrorMessage}
                        </span>
                    </div>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <button
                            className={styles.cancelButton}
                            onClick={() => this.props.onAddNewLinkCancelled()}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${styles.submitButton} ${
                                tempSaved ? styles.saved : ''
                            }`}
                            onClick={this._onSubmit}
                        >
                            Save{tempSaved ? 'd' : ''}
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

    private _onSubmit = () => {
        let { shortName, fullLink, tempSaved } = this.state;
        const stateInvalid = !!Object.keys(this._validateState(this.state))
            .length;
        if (!shortName || !fullLink || stateInvalid || tempSaved) {
            return;
        }
        if (!fullLink.match(HTTP_REGEX)) {
            fullLink = 'http://' + fullLink;
        }
        const goLink: GoLinkItem = { shortName, fullLink };
        this.setState({ tempSaved: true });
        setTimeout(() => {
            this.props.onGoLinkSubmitted(goLink);
            this.setState({ shortName: '', fullLink: '', tempSaved: false });
        }, 1500);
    };

    private buildClassLists = (state: State) => {
        const {
            shortNameErrorMessage,
            fullLinkErrorMessage
        } = this._validateState(state);
        const { shortName, fullLink } = state;
        let shortNameInputClasses = [styles.input, styles.inputWithSpan];
        !!shortNameErrorMessage &&
            (shortNameInputClasses = [
                ...shortNameInputClasses,
                styles.inputErrorMessageVisible
            ]);
        let fullLinkInputClasses = [styles.input];
        !!fullLinkErrorMessage &&
            (fullLinkInputClasses = [
                ...fullLinkInputClasses,
                styles.inputErrorMessageVisible
            ]);
        let shortNameErrorMessageClasses = [styles.errorMessage];
        if (!!shortName && !!shortNameErrorMessage) {
            shortNameErrorMessageClasses = [
                ...shortNameErrorMessageClasses,
                styles.errorMessageVisible
            ];
        }
        let fullLinkErrorMessageClasses = [styles.errorMessage];
        if (!!fullLink && !!fullLinkErrorMessage) {
            fullLinkErrorMessageClasses = [
                ...fullLinkErrorMessageClasses,
                styles.errorMessageVisible
            ];
        }
        return {
            shortNameInputClasses,
            fullLinkInputClasses,
            shortNameErrorMessageClasses,
            fullLinkErrorMessageClasses
        };
    };

    private _validateState = (
        state: State
    ): {
        shortNameErrorMessage: string;
        fullLinkErrorMessage: string;
    } => {
        let shortNameErrorMessage = null,
            fullLinkErrorMessage = null;

        const { shortName, fullLink } = state;

        if (this.props.goLinks.find(egl => egl.shortName === shortName)) {
            shortNameErrorMessage = 'This go link already exists.';
        }
        if (!fullLink.match(URL_REGEX)) {
            fullLinkErrorMessage = 'URL is invalid.';
        }
        return { shortNameErrorMessage, fullLinkErrorMessage };
    };
}

export default NewGoLink;