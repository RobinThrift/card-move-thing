/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Record} from 'immutable';
export type Column = {
    id: string,
    title: string,
    order: number
}
const DEFAULT_FIELDS: Column = {id: '', title: '', order: 0};
export let ColumnStruct = Record(DEFAULT_FIELDS);
