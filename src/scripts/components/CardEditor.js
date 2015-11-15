import React, {PropTypes, Component} from 'react';

class CardEditorComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editableContent: props.value
        };
    };

    componentDidMount() {
        this.el.focus();
        this.el.selectionStart = this.el.selectionEnd = this.el.value.length;
        this.autoResize();
    };

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.props.onEditingDone({
                content: e.target.value
            });
        }
    };

    autoResize() {
        //auto-resize the textarea
        this.el.style.height = '10px';
        this.el.style.height = this.el.scrollHeight + 'px';
    };

    onContentChange(e) {
        this.setState({editableContent: e.target.value});
        this.autoResize();
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
