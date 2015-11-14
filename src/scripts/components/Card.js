import React, {PropTypes} from 'react';

export function Card(props) {
    let classList = 'card-card';
    if (props.color) {
        classList += ' ' + props.color;
    }

    return (
        <div className={classList} onClick={props.onClick}>
            <h3 className="card-card__header">{props.title}</h3>
            {props.children}
        </div>
    );
}

Card.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func
};
