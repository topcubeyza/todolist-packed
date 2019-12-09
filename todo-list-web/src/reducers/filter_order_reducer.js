import { 
    FILTER_ORDER_SUCCESSFUL,
    CLEAR_FILTERS_ORDERS
 } from "../constants/reducer_types"

const INITIAL_STATE = {
    foTodoItems: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTER_ORDER_SUCCESSFUL: {
            return {...state,foTodoItems: action.payload}
        }
        case CLEAR_FILTERS_ORDERS: {
            return INITIAL_STATE;
        }
        default: {
            return {state};
        }
    }
}