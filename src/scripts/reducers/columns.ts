/// <reference path='../../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Map} from 'immutable';
import {ADD_COLUMN, UPDATE_COLUMN, REMOVE_COLUMN} from '../actions/columns';

function sortColumns(c1, c2) {
    return c1.order - c1.order;
}

export function columnReducer(columns = Map(), action) {
    switch (action.type) {
        case ADD_COLUMN:
            return columns.set(action.column.id, action.column).sort(sortColumns);
        case UPDATE_COLUMN:
            if (columns.has(action.id)) {
                return columns.set(action.id, action.column).sort(sortColumns);
            }
            return columns;
        case REMOVE_COLUMN:
            return columns.delete(action.id).sort(sortColumns);
        default:
            return columns;
    }
}

