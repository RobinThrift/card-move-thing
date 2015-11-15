/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Map} from 'immutable';
import * as uuid from 'node-uuid';
import {Row} from './types/Row';
import {Column} from './types/Column';
import {Card} from './types/Card';

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
    {id: uuid.v4(), order: 1, column: 1, row: 1, content: '-- color: red\n# Card 1-1-1\nA very important card.'},
    {id: uuid.v4(), order: 1, column: 2, row: 1, content: '# Card 1-2-1\nSit'},
    {id: uuid.v4(), order: 1, column: 3, row: 3, content: '# Card 3-3-1\nAmet'}
];

export default {
    rows: rows.reduce((map, r) => {
        return map.set(r.id, r);
    }, Map<string, Row>()),
    columns: columns.reduce((map, c) => {
        return map.set(c.id, c);
    }, Map<string, Column>()),
    cards: cards.reduce((map, c) => {
        return map.set(c.id, c);
    }, Map<string, Card>())
};
