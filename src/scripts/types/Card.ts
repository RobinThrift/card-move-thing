/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Record} from 'immutable';
export type Card = {
    id: string,
    content: string,
    title: string,
    order: number,
    row: number,
    column: number,
    color?: string
}
const DEFAULT_FIELDS: Card = {id: '', content: '', title: '', order: 0, column: 0, row: 0, color: ''};
export let CardStruct = Record(DEFAULT_FIELDS);
