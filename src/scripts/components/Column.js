import React, {PropTypes} from 'react';

export function Column(props) {
    let classList = 'card-column';
    classList += (props.heading) ? ' card-column--header' : '';

    let content = (props.heading) ? (<span>{props.children}</span>) : props.children;
    return (
        <div className={classList}>
          {content}
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
