import { 
    GET_TODO_ITEMS_FAILED,
    GET_TODO_ITEMS_STARTED,
    GET_TODO_ITEMS_SUCCESSFUL,
    ADD_TODO_ITEMS_FAILED,
    ADD_TODO_ITEMS_STARTED,
    ADD_TODO_ITEMS_SUCCESSFUL,
    GET_TODO_ITEM_FAILED,
    GET_TODO_ITEM_STARTED,
    GET_TODO_ITEM_SUCCESSFUL,
    DELETE_ITEM_FAILED,
    DELETE_ITEM_STARTED,
    DELETE_ITEM_SUCCESSFUL,
    UPDATE_ITEM_FAILED,
    UPDATE_ITEM_STARTED,
    UPDATE_ITEM_SUCCESSFUL,
    UPDATE_STATUS_SUCCESSFUL,
    UPDATE_STATUS_FAILED,
    UPDATE_STATUS_STARTED
 } from "../constants";
import { 
    GET_TODO_ITEMS_URL, 
    ADD_TODO_ITEM_URL, 
    GET_TODO_ITEM_URL, 
    DELETE_TODO_ITEM_URL,
    UPDATE_TODO_ITEM_URL, 
    UPDATE_STATUS_URL} from "../constants/endpoints";

export const fetchTodoItems = (id) => {
    return async dispatch => {
        dispatchGetTodoItemsStarted(dispatch);
        dispatchTodoItems(
            dispatch,
            await fetch(GET_TODO_ITEMS_URL + "/" + id, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
                credentials: "include"
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return null;
            }).catch(error => {
                console.error(error)
                return null;
            })
        )
    }
}

export const addTodoItem = (todoItem) => {
    return async dispatch => {
        dispatchAddTodoItemStarted(dispatch);
        dispatchAdd(
            dispatch,
            await fetch(ADD_TODO_ITEM_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify(todoItem)
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return null;
            }).catch(error => {
                console.error(error)
                return null;
            })
        )
    }
}

export const getTodoItem = (id) => {
    return async dispatch => {
        dispatchGetTodoItemStarted(dispatch);
        dispatchTodoItem(
            dispatch,
            await fetch(GET_TODO_ITEM_URL + "/" + id, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
                credentials: "include",
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return null;
            }).catch(error => {
                console.error(error)
                return null;
            })
        )
    }
}

export const deleteTodoItem = (id) => {
    return async dispatch => {
        dispatchDeleteItemStarted(dispatch);
        dispatchDelete(
            dispatch,
            await fetch(DELETE_TODO_ITEM_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({id})
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return false;
            }).catch(error => {
                console.error(error)
                return false;
            }),
            id
        )
    }
}

export const updateTodoItem = (todoItem) => {
    return async dispatch => {
        dispatchUpdateItemStarted(dispatch);
        dispatchUpdate(
            dispatch,
            await fetch(UPDATE_TODO_ITEM_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify(todoItem)
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return null;
            }).catch(error => {
                console.error(error)
                return null;
            })
        )
    }
}

export const updateStatus = (id, status) => {
    let data = JSON.stringify({id, status})
    return async dispatch => {
        dispatchUpdateStatusStarted(dispatch);
        dispatchStatus(
            dispatch,
            await fetch(UPDATE_STATUS_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: data
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return false;
            }).catch(error => {
                console.error(error)
                return false;
            }),
            {id, status}
        )
    }
}

const dispatchTodoItems = (dispatch, data) => {
    dispatch({
        type: data == null ? GET_TODO_ITEMS_FAILED : GET_TODO_ITEMS_SUCCESSFUL,
        payload: data
    })
}

const dispatchGetTodoItemsStarted = (dispatch) => {
    dispatch({
        type: GET_TODO_ITEMS_STARTED
    })
}

const dispatchAdd = (dispatch, data) => {
    dispatch({
        type: data == null ? ADD_TODO_ITEMS_FAILED : ADD_TODO_ITEMS_SUCCESSFUL,
        payload: data
    })
}

const dispatchAddTodoItemStarted = (dispatch) => {
    dispatch({
        type: ADD_TODO_ITEMS_STARTED
    })
}

const dispatchDelete = (dispatch, data, id) => {
    dispatch({
        type: data == false ? DELETE_ITEM_FAILED : DELETE_ITEM_SUCCESSFUL,
        payload: id
    })
}

const dispatchDeleteItemStarted = (dispatch) => {
    dispatch({
        type: DELETE_ITEM_STARTED
    })
}

const dispatchTodoItem = (dispatch, data) => {
    dispatch({
        type: data == null ? GET_TODO_ITEM_FAILED : GET_TODO_ITEM_SUCCESSFUL,
        payload: data
    })
}

const dispatchGetTodoItemStarted = (dispatch) => {
    dispatch({
        type: GET_TODO_ITEM_STARTED
    })
}

const dispatchUpdate = (dispatch, data) => {
    dispatch({
        type: data == null ? UPDATE_ITEM_FAILED : UPDATE_ITEM_SUCCESSFUL,
        payload: data
    })
}

const dispatchUpdateItemStarted = (dispatch) => {
    dispatch({
        type: UPDATE_ITEM_STARTED
    })
}

const dispatchStatus = (dispatch, data, payload) => {
    dispatch({
        type: data == false ? UPDATE_STATUS_FAILED : UPDATE_STATUS_SUCCESSFUL,
        payload: payload
    })
}

const dispatchUpdateStatusStarted = (dispatch) => {
    dispatch({
        type: UPDATE_STATUS_STARTED
    })
}