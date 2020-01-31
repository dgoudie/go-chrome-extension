import { IStackProps, Stack } from 'office-ui-fabric-react/lib/Stack';
import React, { Component } from 'react';
import { addGoLinks, getAllGoLinks } from '../../utils/storage';

import { GoLinkItem } from '../../models/go-link-item';
import Input from '../input/Input';
import List from '../list/List';

interface State {
    goLinks: GoLinkItem[];
}

export default class Popup extends Component<{}, State> {
    constructor(props) {
        super(props);
        getAllGoLinks().subscribe(goLinks => this.setState({ goLinks }));
    }

    state: State = {
        goLinks: []
    };

    render() {
        return (
            <Stack>
                <Input
                    onGoLinkSubmitted={this._onGoLinkSubmitted}
                    existingGoLinks={this.state.goLinks}
                />
                <List goLinks={this.state.goLinks} />
            </Stack>
        );
    }

    private _onGoLinkSubmitted = (goLink: GoLinkItem) => {
        addGoLinks([goLink]).subscribe(goLinks => this.setState({ goLinks }));
    };
}
