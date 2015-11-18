/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='../../node_modules/immutable/dist/immutable.d.ts'/>
import {Map} from 'immutable';
import * as uuid from 'node-uuid';
import {Row} from './types/Row';
import {Column} from './types/Column';
import {Card} from './types/Card';

let rows = [
    {id: uuid.v4(), title: 'INK 1', order: 1},
    {id: uuid.v4(), title: 'INK 2', order: 2},
    {id: uuid.v4(), title: 'INK 3', order: 3}
];
let columns = [
    {id: uuid.v4(), title: 'Spiel starten', order: 1},
    {id: uuid.v4(), title: 'Map laden', order: 2},
    {id: uuid.v4(), title: 'Pi2Go platzieren', order: 3},
    {id: uuid.v4(), title: 'Spiel stoppen', order: 4},
    {id: uuid.v4(), title: 'Spiel ansehen', order: 5}
];
let cards = [
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
