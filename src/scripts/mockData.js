import {List} from 'immutable';

export default {
    rows: new List([
        {title: 'Row 1', order: 1},
        {title: 'Row 2', order: 2},
        {title: 'Row 3', order: 3}
    ]),
    columns: new List([
        {title: 'Column 1', order: 1},
        {title: 'Column 2', order: 2},
        {title: 'Column 3', order: 3}
    ]),
    cards: new List([
        {id: 1, title: 'Card 1-1-1', order: 2, column: 1, row: 1, content: 'Lorem'},
        {id: 2, title: 'Card 1-1-2', order: 1, column: 1, row: 1, content: 'A very important card.', color: 'red'},
        {id: 3, title: 'Card 1-2-1', order: 1, column: 2, row: 1, content: 'Sit'},
        {id: 4, title: 'Card 3-3-1', order: 1, column: 3, row: 3, content: 'Amet'}
    ])
};
