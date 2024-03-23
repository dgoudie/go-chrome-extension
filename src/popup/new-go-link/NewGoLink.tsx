import React, { Component } from 'react';
import {
  getArgumentCountFromUrl,
  isValidUrl,
  normalizeUrl,
} from '../../utils/link-utils';

import { GoLinkItem } from '../../models/go-link-item';
import styles from './NewGoLink.module';

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
    fullLink: '',
  };

  shortNameRef = React.createRef<HTMLInputElement>();
  render() {
    const { tempSaved, shortName, fullLink } = this.state;
    const { shortNameErrorMessage, fullLinkErrorMessage } = this._validateState(
      this.state
    );
    const {
      shortNameErrorMessageClasses,
      shortNameInputClasses,
      fullLinkErrorMessageClasses,
      fullLinkInputClasses,
    } = this.buildClassLists(this.state);
    return (
      <div className={`${this.props.className}`}>
        <div className={shortNameInputClasses.join(' ')}>
          <span className={styles.inputGoSpan}>go/</span>
          <input
            disabled={tempSaved}
            value={shortName}
            placeholder='...'
            ref={this.shortNameRef}
            onChange={(event: any) =>
              this.setState({ shortName: event.target.value })
            }
            onKeyDown={this._onKeyDown}
          />
          <span className={shortNameErrorMessageClasses.join(' ')}>
            {shortNameErrorMessage}
          </span>
        </div>
        <div className={fullLinkInputClasses.join(' ')}>
          <input
            disabled={tempSaved}
            value={fullLink}
            placeholder='google.com'
            onChange={(event: any) =>
              this.setState({
                fullLink: event.target.value,
              })
            }
            onKeyDown={this._onKeyDown}
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
              !this.state.tempSaved && this.props.onAddNewLinkCancelled()
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

  private _onKeyDown = (event) => event.key === 'Enter' && this._onSubmit();

  private _onSubmit = () => {
    let { shortName, fullLink, tempSaved } = this.state;
    const { shortNameErrorMessage, fullLinkErrorMessage } = this._validateState(
      this.state
    );
    const stateInvalid = !!shortNameErrorMessage || !!fullLinkErrorMessage;
    if (!shortName || !fullLink || stateInvalid || tempSaved) {
      return;
    }
    fullLink = normalizeUrl(fullLink);
    const goLink: GoLinkItem = { shortName, fullLink, id: crypto.randomUUID() };
    this.setState({ tempSaved: true, shortName: '', fullLink: '' });
    this.props.onGoLinkSubmitted(goLink);
  };

  private buildClassLists = (state: State) => {
    const { shortNameErrorMessage, fullLinkErrorMessage } =
      this._validateState(state);
    const { shortName, fullLink } = state;
    let shortNameInputClasses = [styles.input, styles.inputWithSpan];
    if (!!shortName && !!shortNameErrorMessage) {
      shortNameInputClasses = [
        ...shortNameInputClasses,
        styles.inputErrorMessageVisible,
      ];
    }
    let fullLinkInputClasses = [styles.input];
    if (!!fullLink && fullLinkErrorMessage) {
      fullLinkInputClasses = [
        ...fullLinkInputClasses,
        styles.inputErrorMessageVisible,
      ];
    }
    let shortNameErrorMessageClasses = [styles.errorMessage];
    if (!!shortName && !!shortNameErrorMessage) {
      shortNameErrorMessageClasses = [
        ...shortNameErrorMessageClasses,
        styles.errorMessageVisible,
      ];
    }
    let fullLinkErrorMessageClasses = [styles.errorMessage];
    if (!!fullLink && !!fullLinkErrorMessage) {
      fullLinkErrorMessageClasses = [
        ...fullLinkErrorMessageClasses,
        styles.errorMessageVisible,
      ];
    }
    return {
      shortNameInputClasses,
      fullLinkInputClasses,
      shortNameErrorMessageClasses,
      fullLinkErrorMessageClasses,
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
    if (!isValidUrl(fullLink)) {
      fullLinkErrorMessage = 'URL is invalid.';
    }
    const argCount = getArgumentCountFromUrl(fullLink);
    const linksWithMatchingShortName = this.props.goLinks
      .filter((egl) => egl.shortName === shortName)
      .map((egl) => egl.fullLink);

    if (
      linksWithMatchingShortName.find(
        (link) => argCount === getArgumentCountFromUrl(link)
      )
    ) {
      fullLinkErrorMessage =
        'A link with the same number of arguments already exists.';
    }
    return { shortNameErrorMessage, fullLinkErrorMessage };
  };
}

export default NewGoLink;
