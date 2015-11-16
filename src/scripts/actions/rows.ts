
export const ADD_ROW = {};
export const UPDATE_ROW = {};
export const REMOVE_ROW = {};
export const SYNC_ROWS = {};

export function addRow(row) {
    return {type: ADD_ROW, row};
}

export function updateRow(id, row) {
    return {type: UPDATE_ROW, id, row};
}

export function removeRow(id) {
    return {type: REMOVE_ROW, id};
}

export function syncRows(rows) {
    return {type: REMOVE_ROW, rows};
}
