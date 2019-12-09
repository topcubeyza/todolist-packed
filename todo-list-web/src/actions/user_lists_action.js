import { 
    USER_DETAIL, 
    USER_DETAIL_FAILED,
    ADD_LIST_FAILED,
    ADD_LIST_STARTED,
    ADD_LIST_SUCCESSFUL,
    DELETE_LIST_FAILED,
    DELETE_LIST_STARTED,
    DELETE_LIST_SUCCESSFUL
 } from "../constants";
import { GET_LISTS_URL, ADD_LIST_URL, DELETE_LIST_URL } from "../constants/endpoints";

export const fetchUserLists = () => {
    return async dispatch => {
        dispatchUserLists(
            dispatch,
            await fetch(GET_LISTS_URL, {
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

export const addList = (name) => {
    return async dispatch => {
        dispatchAddStarted(dispatch);
        dispatchAdd(
            dispatch,
            await fetch(ADD_LIST_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({name})
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

export const deleteList = (id) => {
    return async dispatch => {
        dispatchDeleteStarted(dispatch);
        dispatchDelete(
            dispatch,
            await fetch(DELETE_LIST_URL, {
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

                return null;
            }).catch(error => {
                console.error(error)
                return null;
            })
        )
    }
}

const dispatchUserLists = (dispatch, data) => {
    dispatch({
        type: data == null ? USER_DETAIL_FAILED : USER_DETAIL,
        payload: data
    })
}

const dispatchAddStarted = (dispatch) => {
    dispatch({
        type: ADD_LIST_STARTED
    })
}

const dispatchAdd = (dispatch, data) => {
    dispatch({
        type: data == null ? ADD_LIST_FAILED : ADD_LIST_SUCCESSFUL,
        payload: data
    })
}

const dispatchDeleteStarted = (dispatch) => {
    dispatch({
        type: DELETE_LIST_STARTED
    })
}

const dispatchDelete = (dispatch, data) => {
    dispatch({
        type: data == null ? DELETE_LIST_FAILED : DELETE_LIST_SUCCESSFUL,
        payload: data
    })
}