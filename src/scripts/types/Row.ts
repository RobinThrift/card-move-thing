/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import {Record} from 'immutable';
export type Row = {
    id: string,
    title: string,
    order: number
}
const DEFAULT_FIELDS: Row = {id: '', title: '', order: 0};
export let RowStruct = Record(DEFAULT_FIELDS);
