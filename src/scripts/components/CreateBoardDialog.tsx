import * as React from 'react';
import {Dialog, TextField} from 'material-ui';

import randomId from '../services/id';
import slug = require('slug');

type CreateBoardDialogProps = {
    onBoardCreate: (id: string) => any,
    open: boolean
}

type CreateBoardDialogState = {
    id: string
}

export class CreateBoardDialog extends React.Component<CreateBoardDialogProps, CreateBoardDialogState> {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    };

    onBoardNameChange(e) {
        this.setState({id: e.target.value});
    }

    onCreateClick() {
        let id;
        if (this.state.id.trim().length > 0) {
            id = slug(this.state.id.trim(), {lower: true});
        } else {
            id = randomId(10);
        }

        this.setState({id: id});
        this.props.onBoardCreate(id);
    }

    render() {
        let actions = [
            { text: 'Create board', ref: 'create', onClick: this.onCreateClick.bind(this) }
        ];

        return (
            <Dialog
                title="Hey there, fellow card mover!"
                actions={actions}
                actionFocus="create"
                open={this.props.open}>
                Enter a name for the board you want to create, or leave it empty to create a randomly named board.
                <TextField floatingLabelText="Board name" style={{width: '100%'}} onChange={this.onBoardNameChange.bind(this)} />
            </Dialog>
        );
    };
}
