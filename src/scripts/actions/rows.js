
export const ADD_ROW = Symbol();
export const UPDATE_ROW = Symbol();
export const REMOVE_ROW = Symbol();

export function addRow(row) {
    return {type: ADD_ROW, row};
}

export function updateRow(id, row) {
    return {type: UPDATE_ROW, id, row};
}

export function removeRow(id) {
    return {type: REMOVE_ROW, id};
}
