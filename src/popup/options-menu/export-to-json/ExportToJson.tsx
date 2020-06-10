import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoLinkItem } from '../../../models/go-link-item';
import React from 'react';
import copy from 'copy-to-clipboard';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import styles from './ExportToJson.module';

interface Props {
    goLinks: GoLinkItem[];
    onClose: () => void;
}

export default function ExportToJson({ goLinks, onClose }: Props) {
    const prettyGoLinks = _formatGoLinksAsString(goLinks);
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2>Export to JSON</h2>
            </div>
            <pre>{prettyGoLinks}</pre>
            <button
                className={styles.copyToClipboard}
                onClick={() => copy(prettyGoLinks)}
            >
                Copy To Clipboard
            </button>
        </div>
    );
}

const _formatGoLinksAsString = (goLinks: GoLinkItem[]) =>
    JSON.stringify(goLinks, null, 2);
