import {
    DefaultButton,
    FocusZone,
    FocusZoneTabbableElements,
    ITextField,
    PrimaryButton,
    Stack,
    TextField,
    mergeStyleSets
} from 'office-ui-fabric-react';
import React, { PureComponent } from 'react';

import { GoLinkItem } from '../../models/go-link-item';

interface Props {
    existingGoLinks: GoLinkItem[];
    onGoLinkSubmitted: (_: GoLinkItem) => void;
}

interface State {
    classes: ReturnType<typeof buildClasses>;
    shortName: string;
    fullLink: string;
}

export default class Input extends PureComponent<Props, State> {
    private inputRef = React.createRef<ITextField>();

    state: State = {
        classes: buildClasses(),
        shortName: '',
        fullLink: ''
    };

    render() {
        const { classes, shortName, fullLink } = this.state;
        const {
            shortNameErrorMessage,
            fullLinkErrorMessage
        } = this._validateState(this.state);
        return (
            <Stack>
                <FocusZone
                    handleTabKey={FocusZoneTabbableElements.all}
                    isCircularNavigation={true}
                >
                    <TextField
                        value={shortName}
                        label="Short Name"
                        componentRef={this.inputRef}
                        onChange={(event: any) =>
                            this.setState({ shortName: event.target.value })
                        }
                        errorMessage={shortNameErrorMessage}
                    />
                    <TextField
                        value={fullLink}
                        label="Full Link"
                        onChange={(event: any) =>
                            this.setState({
                                fullLink: event.target.value
                            })
                        }
                        errorMessage={fullLinkErrorMessage}
                    />
                    <Stack horizontal className={classes.buttonBar}>
                        <PrimaryButton
                            disabled={
                                !shortName ||
                                !fullLink ||
                                !!shortNameErrorMessage ||
                                !!fullLinkErrorMessage
                            }
                            iconProps={{ iconName: 'Add' }}
                            onClick={this._onSubmit}
                        >
                            Add
                        </PrimaryButton>
                    </Stack>
                </FocusZone>
            </Stack>
        );
    }

    private _onSubmit = () => {
        const { shortName, fullLink } = this.state;
        const goLink: GoLinkItem = { shortName, fullLink };
        this.props.onGoLinkSubmitted(goLink);
        this.setState({ shortName: '', fullLink: '' });
        this.initialFocus();
    };

    private _validateState = (
        state: State
    ): {
        shortNameErrorMessage: string;
        fullLinkErrorMessage: string;
    } => {
        let shortNameErrorMessage = null,
            fullLinkErrorMessage = null;

        const { shortName } = state;

        if (
            this.props.existingGoLinks.find(egl => egl.shortName === shortName)
        ) {
            shortNameErrorMessage = 'This go link already exists.';
        }
        return { shortNameErrorMessage, fullLinkErrorMessage };
    };

    componentDidMount() {
        this.initialFocus();
    }

    private initialFocus = () =>
        !!this.inputRef.current && this.inputRef.current.focus();
}

// Styles

const buildClasses = () =>
    mergeStyleSets({
        buttonBar: {
            margin: '8px 0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    });
