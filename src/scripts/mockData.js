import {Map} from 'immutable';
import uuid from 'uuid';

let rows = [
    {id: uuid.v4(), title: 'Row 1', order: 1},
    {id: uuid.v4(), title: 'Row 2', order: 2},
    {id: uuid.v4(), title: 'Row 3', order: 3}
];
let columns = [
    {id: uuid.v4(), title: 'Column 1', order: 1},
    {id: uuid.v4(), title: 'Column 2', order: 2},
    {id: uuid.v4(), title: 'Column 3', order: 3}
];
let cards = [
    {id: uuid.v4(), order: 2, column: 1, row: 1, content: '# Card 1-1-2\nLorem'},
    {id: uuid.v4(), order: 1, column: 1, row: 1, content: '# Card 1-1-1\nA very important card.', color: 'red'},
    {id: uuid.v4(), order: 1, column: 2, row: 1, content: '# Card 1-2-1\nSit'},
    {id: uuid.v4(), order: 1, column: 3, row: 3, content: '# Card 3-3-1\nAmet'}
];

export default {
    rows: rows.reduce((map, r) => {
        return map.set(r.id, r);
    }, new Map()),
    columns: columns.reduce((map, c) => {
        return map.set(c.id, c);
    }, new Map()),
    cards: cards.reduce((map, c) => {
        return map.set(c.id, c);
    }, new Map())
};
