import React, { useState } from 'react';

import ExportToJson from './export-to-json/ExportToJson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoLinkItem } from '../../models/go-link-item';
import ImportFromJson from './import-from-json/ImportFromJson';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import styles from './OptionsMenu.module';

type SettingsMenuOption = null | 'exportJson' | 'importJson';

interface Props {
    goLinks: GoLinkItem[];
    onGoLinksAdded: (_: GoLinkItem[]) => void;
    onClose: () => void;
}

export default function OptionsMenu({
    goLinks,
    onGoLinksAdded,
    onClose,
}: Props) {
    const [settingsMenuOption, setSettingsMenuOption] = useState<
        SettingsMenuOption
    >(null);

    let pageComponent: JSX.Element;
    switch (settingsMenuOption) {
        case null:
            pageComponent = (
                <OptionsMenuHome menuOptionRequested={setSettingsMenuOption} />
            );
            break;
        case 'exportJson':
            pageComponent = (
                <ExportToJson
                    goLinks={goLinks}
                    onClose={() => setSettingsMenuOption(null)}
                />
            );
            break;
        case 'importJson':
            pageComponent = (
                <ImportFromJson
                    validatedGoLinksAdded={onGoLinksAdded}
                    onClose={() => setSettingsMenuOption(null)}
                />
            );
    }

    return (
        <div className={styles.optionsMenuWrapper}>
            <div className={styles.optionsMenu}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {pageComponent}
            </div>
        </div>
    );
}

interface OptionsMenuHomeProps {
    menuOptionRequested: (_: SettingsMenuOption) => void;
}

const OptionsMenuHome = ({ menuOptionRequested }: OptionsMenuHomeProps) => (
    <div className={styles.optionsMenuHome}>
        <h2 className={styles.optionsMenuHomeHeader}>Options</h2>
        <button onClick={() => menuOptionRequested('importJson')}>
            Import from JSON
        </button>
        <button onClick={() => menuOptionRequested('exportJson')}>
            Export to JSON
        </button>
    </div>
);
