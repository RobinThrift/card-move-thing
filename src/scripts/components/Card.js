import React, {PropTypes} from 'react';

export function Card(props) {
    return (
        <div className="card-card">
            <h3 className="card-card__header">{props.title}</h3>
            {props.children}
        </div>
    );
}

Card.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.string
};
