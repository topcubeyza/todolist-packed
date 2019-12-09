import { 
    UPDATE_STATUS_STARTED,
    UPDATE_STATUS_FAILED,
    UPDATE_STATUS_SUCCESSFUL
 } from "../constants";
import { UPDATE_STATUS_URL } from "../constants/endpoints";

export const updateStatus = (itemId, status) => {
    let data = JSON.stringify({id:itemId, status})
    return async dispatch => {
        dispatchUpdateStatusStarted(dispatch)
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
            {itemId,status}
        )
    }
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