/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import {Record} from 'immutable';
export type Card = {
    id: string,
    content: string,
    order: number,
    row: number,
    column: number
}
const DEFAULT_FIELDS: Card = {id: '', content: '', order: 0, column: 0, row: 0};
export let CardStruct = Record(DEFAULT_FIELDS);
