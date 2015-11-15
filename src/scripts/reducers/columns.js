
import {Map} from 'immutable';
import {ADD_COLUMN, UPDATE_COLUMN, REMOVE_COLUMN} from '../actions/columns.js';

function sortColumns(c1, c2) {
    return c2.sort - c1.sort;
}

export function columnReducer(columns = new Map(), action) {
    switch (action.type) {
        case ADD_COLUMN:
            return columns.set(action.column.id, action.column).sort(sortColumns);
        case UPDATE_COLUMN:
            if (columns.has(action.id)) {
                return columns.set(action.id, action.column).sort(sortColumns);
            }
            return columns;
        case REMOVE_COLUMN:
            return columns.delete(action.id, action.column).sort(sortColumns);
        default:
            return columns;
    }
}

