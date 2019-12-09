import { 
    ADD_DEPENDENCY_STARTED,
    ADD_DEPENDENCY_FAILED,
    ADD_DEPENDENCY_SUCCESSFUL,
    REMOVE_DEPENDENCY_STARTED,
    REMOVE_DEPENDENCY_FAILED,
    REMOVE_DEPENDENCY_SUCCESSFUL
 } from "../constants";
import { 
    ADD_DEPENDENCY_URL, REMOVE_DEPENDENCY_URL } from "../constants/endpoints";

export const addDependency = (dependentTodoItem, dependedTodoItem) => {
    let data = JSON.stringify({dependedTodoItemId:dependedTodoItem.id, dependentTodoItemId:dependentTodoItem.id})
    return async dispatch => {
        dispatchAddStarted(dispatch)
        dispatchAddDependency(
            dispatch,
            await fetch(ADD_DEPENDENCY_URL, {
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
            {dependentTodoItem,dependedTodoItem}
        )
    }
}

export const removeDependency = (dependentTodoItem, dependedTodoItem) => {
    let data = JSON.stringify({dependedTodoItemId:dependedTodoItem.id, dependentTodoItemId:dependentTodoItem.id})
    return async dispatch => {
        dispatchRemoveStarted(dispatch)
        dispatchRemoveDependency(
            dispatch,
            await fetch(REMOVE_DEPENDENCY_URL, {
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
            {dependentTodoItem,dependedTodoItem}
        )
    }
}

const dispatchAddDependency = (dispatch, data, payload) => {
    dispatch({
        type: data == false ? ADD_DEPENDENCY_FAILED : ADD_DEPENDENCY_SUCCESSFUL,
        payload: payload
    })
}

const dispatchRemoveDependency = (dispatch, data, payload) => {
    dispatch({
        type: data == false ? REMOVE_DEPENDENCY_FAILED : REMOVE_DEPENDENCY_SUCCESSFUL,
        payload: payload
    })
}

const dispatchAddStarted = (dispatch) => {
    dispatch({
        type: ADD_DEPENDENCY_STARTED
    })
}

const dispatchRemoveStarted = (dispatch) => {
    dispatch({
        type: REMOVE_DEPENDENCY_STARTED
    })
}