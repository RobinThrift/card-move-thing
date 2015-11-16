/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import {createStore} from 'redux';
import {appReducers} from '../reducers';

import {Map} from 'immutable';
import {Row} from '../types/Row';
import {Column} from '../types/Column';
import {Card} from '../types/Card';
import {v4 as uuid} from 'node-uuid';

export type State = {
    id: string,
    rows: Map<string, Row>,
    columns: Map<string, Column>,
    cards: Map<string, Card>
}

// let initState: State = {
//     id: uuid(),
//     rows: Map<string, Row>(),
//     columns: Map<string, Column>(),
//     cards: Map<string, Card>()
// };

import mockData from '../mockData';

export let state = createStore(appReducers, mockData);

