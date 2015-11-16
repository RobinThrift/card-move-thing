
export const ADD_COLUMN = {};
export const UPDATE_COLUMN = {};
export const REMOVE_COLUMN = {};
export const SYNC_COLUMNS = {};

export function addColumn(column) {
    return {type: ADD_COLUMN, column};
}

export function updateColumn(id, column) {
    return {type: UPDATE_COLUMN, id, column};
}

export function removeColumn(id) {
    return {type: REMOVE_COLUMN, id};
}

export function syncColumns(columns) {
    return {type: SYNC_COLUMNS, columns};
}
