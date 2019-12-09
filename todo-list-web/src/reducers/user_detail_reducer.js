import validate from "validate.js"

import { 
    USER_DETAIL, 
    USER_DETAIL_FAILED,
    ADD_LIST_STARTED,
    ADD_LIST_SUCCESSFUL,
    ADD_LIST_FAILED,
    DELETE_LIST_STARTED,
    DELETE_LIST_SUCCESSFUL,
    DELETE_LIST_FAILED
 } from "../constants/reducer_types"

const INITIAL_STATE = {
    userListsFailed: false,
    userLists: [],
    addListStarted: false,
    addListFailed: false,
    addListSuccessful: false,
    deleteListStarted: false,
    deleteListFailed: false,
    deleteListSuccessful: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DETAIL:
        {
            return { ...INITIAL_STATE, userLists: action.payload }
        }
        case USER_DETAIL_FAILED:
        {
            return { ...INITIAL_STATE, userListsFailed: true}
        }
        case ADD_LIST_STARTED:
        {
            return { ...INITIAL_STATE, userLists: state.userLists, addListStarted: true, addListFailed: false, addListSuccessful: false}
        }
        case ADD_LIST_SUCCESSFUL:
        {
            return { 
                ...INITIAL_STATE,
                addListStarted: false, 
                addListFailed: false, 
                addListSuccessful: true,
                userLists: [...state.userLists, action.payload]
            }
        }
        case ADD_LIST_FAILED:
        {
            return { ...INITIAL_STATE, userLists: state.userLists, addListStarted: false, addListFailed: true, addListSuccessful: false}
        }
        case DELETE_LIST_STARTED:
        {
            return { ...INITIAL_STATE, userLists: state.userLists, deleteListStarted: true, deleteListFailed: false, deleteListSuccessful: false}
        }
        case DELETE_LIST_SUCCESSFUL:
        {
            let oldList = state.userLists;
            let newList = [];
            if (validate.isArray(oldList)) {
                oldList.map(list => {
                    if (list.id != action.payload) {
                        newList.push(list)
                    }
                })
            }
            return { 
                ...INITIAL_STATE,
                deleteListFailed: false,
                deleteListStarted: false,
                deleteListSuccessful: true,
                userLists: newList
            }
        }
        case DELETE_LIST_FAILED:
        {
            return { ...INITIAL_STATE, userLists: state.userLists, deleteListStarted: false, deleteListFailed: true, deleteListSuccessful: false}
        }
        default: {
            return {state};
        }
    }
}