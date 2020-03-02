import React, { Component } from 'react';

import { GoLinkItem } from '../../models/go-link-item';
import styles from './NewGoLink.module';

const HTTP_REGEX = /https?:\/\//i;
const URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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
        return (
            <div className={`${this.props.className}`}>
                <div className={shortNameInputClasses.join(' ')}>
                    <span className={styles.inputGoSpan}>go/</span>
                    <input
                        disabled={tempSaved}
                        value={shortName}
                        placeholder="..."
                        ref={this.shortNameRef}
                        onChange={(event: any) =>
                            this.setState({ shortName: event.target.value })
                        }
                        onKeyPress={this._onKeyPress}
                    />
                    <span className={shortNameErrorMessageClasses.join(' ')}>
                        {shortNameErrorMessage}
                    </span>
                </div>
                <div className={fullLinkInputClasses.join(' ')}>
                    <input
                        disabled={tempSaved}
                        value={fullLink}
                        placeholder="google.com"
                        onChange={(event: any) =>
                            this.setState({
                                fullLink: event.target.value
                            })
                        }
                        onKeyPress={this._onKeyPress}
                    />
                    <span className={fullLinkErrorMessageClasses.join(' ')}>
                        {fullLinkErrorMessage}
                    </span>
                </div>
                <div className={styles.buttonBar}>
                    <button
                        disabled={tempSaved}
                        className={styles.cancelButton}
                        onClick={() =>
                            !this.state.tempSaved &&
                            this.props.onAddNewLinkCancelled()
                        }
                    >
                        Cancel
                    </button>
                    <button
                        disabled={tempSaved}
                        className={`${styles.submitButton} ${
                            tempSaved ? styles.saved : ''
                        }`}
                        onClick={this._onSubmit}
                    >
                        Save{tempSaved ? 'd' : ''}
                    </button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.focusShortName();
    }

    focusShortName() {
        !!this.shortNameRef.current && this.shortNameRef.current.focus();
    }

    private _onKeyPress = event => event.key === 'Enter' && this._onSubmit();

    private _onSubmit = () => {
        let { shortName, fullLink, tempSaved } = this.state;
        const {
            shortNameErrorMessage,
            fullLinkErrorMessage
        } = this._validateState(this.state);
        const stateInvalid = !!shortNameErrorMessage || !!fullLinkErrorMessage;
        if (!shortName || !fullLink || stateInvalid || tempSaved) {
            return;
        }
        if (!fullLink.match(HTTP_REGEX)) {
            fullLink = 'http://' + fullLink;
        }
        const goLink: GoLinkItem = { shortName, fullLink };
        this.setState({ tempSaved: true, shortName: '', fullLink: '' });
        this.props.onGoLinkSubmitted(goLink);
    };

    private buildClassLists = (state: State) => {
        const {
            shortNameErrorMessage,
            fullLinkErrorMessage
        } = this._validateState(state);
        const { shortName, fullLink } = state;
        let shortNameInputClasses = [styles.input, styles.inputWithSpan];
        if (!!shortName && !!shortNameErrorMessage) {
            shortNameInputClasses = [
                ...shortNameInputClasses,
                styles.inputErrorMessageVisible
            ];
        }
        let fullLinkInputClasses = [styles.input];
        if (!!fullLink && fullLinkErrorMessage) {
            fullLinkInputClasses = [
                ...fullLinkInputClasses,
                styles.inputErrorMessageVisible
            ];
        }
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
