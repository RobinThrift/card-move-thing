
import {Map} from 'immutable';
import {ADD_ROW, UPDATE_ROW, REMOVE_ROW} from '../actions/rows.js';

function sortRows(r1, r2) {
    return r2.sort - r1.sort;
}

export function rowReducer(rows = new Map(), action) {
    switch (action.type) {
        case ADD_ROW:
            return rows.set(action.row.id, action.row).sort(sortRows);
        case UPDATE_ROW:
            if (rows.has(action.id)) {
                return rows.set(action.id, action.row).sort(sortRows);
            }
            return rows;
        case REMOVE_ROW:
            return rows.delete(action.id, action.row).sort(sortRows);
        default:
            return rows;
    }
}

