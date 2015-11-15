import React, {PropTypes, Component} from 'react';

class CardEditorComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editableContent: props.value
        };
    };

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.props.onEditingDone({
                content: e.target.value
            });
        }
    };

    onContentChange(e) {
        this.setState({editableContent: e.target.value});
    };

    render() {
        return (
            <textarea
                className="card-card__content--editor"
                value={this.state.editableContent}
                onKeyDown={this.onKeyDown.bind(this)}
                onChange={this.onContentChange.bind(this)}
                ref={(el) => {this.el = el;}}></textarea>
        )
    };
}

CardEditorComp.propTypes = {
    value: PropTypes.string,
    onEditingDone: PropTypes.func
};

export let CardEditor = CardEditorComp;
