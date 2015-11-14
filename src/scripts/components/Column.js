import React, {PropTypes} from 'react';

export function Column(props) {
    let classList = 'card-column';
    classList += (props.heading) ? ' card-column--header' : '';
    return (
        <div className={classList}>
            {props.children}
        </div>
    );
}

Column.propTypes = {
    heading: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};
