import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoLinkItem } from '../../../models/go-link-item';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { isValidGoLink } from '../../../utils/link-utils';
import styles from './ImportFromJson.module';

interface Props {
  validatedGoLinksAdded: (_: GoLinkItem[]) => void;
  onClose: () => void;
}

interface State {
  jsonInput: string;
  validatedGoLinks: GoLinkItem[];
}

export default class ImportFromJson extends Component<Props, State> {
  state = {
    jsonInput: '',
    validatedGoLinks: [],
  };

  textAreaRef = React.createRef<HTMLTextAreaElement>();

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={this.props.onClose}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Import From JSON</h2>
        </div>
        <textarea
          spellCheck={false}
          placeholder='JSON string...'
          ref={this.textAreaRef}
          onChange={(e) => this._onInputChange(e.target.value)}
          value={this.state.jsonInput}
        ></textarea>
        <div className={styles.validationMessageAndSubmitButton}>
          {!!this.state.jsonInput &&
            (!!this.state.validatedGoLinks
              ? isValidMessage
              : isNotValidMessage)}
          <button
            disabled={
              !this.state.validatedGoLinks ||
              !this.state.validatedGoLinks.length
            }
            onClick={this._onSubmit}
          >
            Import
          </button>
        </div>
      </div>
    );
  }

  private _onInputChange = (text: string) => {
    const validatedGoLinks = this._validateAndConvertToLinks(text);
    this.setState({ jsonInput: text, validatedGoLinks });
  };

  componentDidMount = () => {
    this.textAreaRef.current.focus();
  };

  private _validateAndConvertToLinks = (text: string): GoLinkItem[] | null => {
    let jsonObj: any;
    try {
      jsonObj = JSON.parse(text);
    } catch (e) {
      return null;
    }
    if (!Array.isArray(jsonObj)) {
      return null;
    }
    if (!jsonObj.every((item) => isValidGoLink(item))) {
      return null;
    }
    return jsonObj.map(({ shortName, fullLink }) => ({
      shortName,
      fullLink,
      id: crypto.randomUUID(),
    }));
  };

  private _onSubmit = () => {
    this.props.validatedGoLinksAdded(this.state.validatedGoLinks);
    this.props.onClose();
  };
}

const isValidMessage = (
  <React.Fragment>
    <FontAwesomeIcon
      icon={faCheck}
      style={{ color: 'forestgreen' }}
    ></FontAwesomeIcon>
    <span>JSON is valid.</span>
  </React.Fragment>
);
const isNotValidMessage = (
  <React.Fragment>
    <FontAwesomeIcon
      icon={faTimes}
      style={{ color: 'crimson' }}
    ></FontAwesomeIcon>
    <span>JSON is not valid.</span>
  </React.Fragment>
);
