
export const ADD_COLUMN = Symbol();
export const UPDATE_COLUMN = Symbol();
export const REMOVE_COLUMN = Symbol();

export function addColumn(column) {
    return {type: ADD_COLUMN, column};
}

export function updateColumn(id, column) {
    return {type: UPDATE_COLUMN, id, column};
}

export function removeColumn(id) {
    return {type: REMOVE_COLUMN, id};
}

