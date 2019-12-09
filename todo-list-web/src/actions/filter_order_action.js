import { 
    FILTER_ORDER_SUCCESSFUL,
    CLEAR_FILTERS_ORDERS
 } from "../constants";
import { FILTER_ORDER_URL } from "../constants/endpoints";

export const filterAndOrder = (filterOrderObject) => {
    return async dispatch => {
        dispatchFOItems(
            dispatch,
            await fetch(FILTER_ORDER_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify(filterOrderObject)
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

export const clearFiltersOrders = () => {
    return dispatch => dispatchClear(dispatch)
}

const dispatchFOItems = (dispatch, data) => {
    dispatch({
        type: FILTER_ORDER_SUCCESSFUL,
        payload: data
    })
}

const dispatchClear = (dispatch) => {
    dispatch({
        type: CLEAR_FILTERS_ORDERS
    })
}