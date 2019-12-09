import validate from "validate.js"

import { 
    GET_TODO_ITEMS_FAILED,
    GET_TODO_ITEMS_STARTED,
    GET_TODO_ITEMS_SUCCESSFUL,
    ADD_TODO_ITEMS_FAILED,
    ADD_TODO_ITEMS_STARTED,
    ADD_TODO_ITEMS_SUCCESSFUL,
    GET_TODO_ITEM_STARTED,
    GET_TODO_ITEM_FAILED,
    GET_TODO_ITEM_SUCCESSFUL,
    DELETE_ITEM_FAILED,
    DELETE_ITEM_STARTED,
    DELETE_ITEM_SUCCESSFUL,
    UPDATE_ITEM_FAILED,
    UPDATE_ITEM_STARTED,
    UPDATE_ITEM_SUCCESSFUL,
    ADD_DEPENDENCY_STARTED,
    ADD_DEPENDENCY_SUCCESSFUL,
    ADD_DEPENDENCY_FAILED,
    REMOVE_DEPENDENCY_STARTED,
    REMOVE_DEPENDENCY_FAILED,
    REMOVE_DEPENDENCY_SUCCESSFUL,
    UPDATE_STATUS_FAILED,
    UPDATE_STATUS_STARTED,
    UPDATE_STATUS_SUCCESSFUL
 } from "../constants/reducer_types"

const INITIAL_STATE = {
    todoItems: [],
    todoItemDetail: null,
    getTodoItemsStarted: false,
    getTodoItemsSuccessful: false,
    getTodoItemsFailed: false,
    addTodoItemFailed: false,
    addTodoItemStarted: false,
    addTodoItemSuccessful: false,
    deleteItemFailed: false,
    deleteItemSuccessful: false,
    deleteItemStarted: false,
    updateItemFailed: false,
    updateItemSuccessful: false,
    updateItemStarted: false,
    getTodoItemStarted: false,
    getTodoItemSuccessful: false,
    getTodoItemFailed: false,
    addDependencyStarted: false,
    addDependencyFailed: false,
    addDependencySuccessful:false,
    removeDependencyStarted: false,
    removeDependencyFailed: false,
    removeDependencySuccessful: false,
    updateStatusStarted: false,
    updateStatusFailed: false,
    updateStatusSuccessful: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TODO_ITEMS_STARTED:
        {
            return { ...INITIAL_STATE, getTodoItemsStarted: true }
        }
        case GET_TODO_ITEMS_SUCCESSFUL:
        {
            return { ...INITIAL_STATE, getTodoItemsSuccessful: true, todoItems: action.payload}
        }
        case GET_TODO_ITEMS_FAILED:
        {
            return { ...INITIAL_STATE, getTodoItemsFailed: true}
        }
        case ADD_TODO_ITEMS_FAILED:
        {
            return { ...INITIAL_STATE, addTodoItemFailed: true, todoItems: state.todoItems}
        }
        case ADD_TODO_ITEMS_STARTED:
        {
            return { ...INITIAL_STATE, addTodoItemStarted: true, todoItems: state.todoItems}
        }
        case ADD_TODO_ITEMS_SUCCESSFUL: 
        {
            return { ...INITIAL_STATE, addTodoItemSuccessful: true, todoItems: [...state.todoItems, action.payload]}
        }case GET_TODO_ITEM_STARTED:
        {
            return { ...INITIAL_STATE, getTodoItemStarted: true, todoItems: state.todoItems }
        }
        case GET_TODO_ITEM_SUCCESSFUL:
        {
            return { ...INITIAL_STATE, getTodoItemSuccessful: true, todoItemDetail: action.payload, todoItems: state.todoItems}
        }
        case GET_TODO_ITEM_FAILED:
        {
            return { ...INITIAL_STATE, getTodoItemFailed: true, todoItems: state.todoItems}
        }
        case DELETE_ITEM_FAILED:
        {
            return { ...INITIAL_STATE, deleteItemFailed: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case DELETE_ITEM_STARTED:
        {
            return { ...INITIAL_STATE, deleteItemStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case DELETE_ITEM_SUCCESSFUL: {
            let oldListd = state.todoItems;
            let newListd = [];
            if (validate.isArray(oldListd)) {
                oldListd.map(item => {
                    if (item.id != action.payload) {
                        newListd.push(item)
                    }
                })
            }
            return { 
                ...INITIAL_STATE,
                deleteItemSuccessful: true,
                todoItems: newListd
            }
        }
        case UPDATE_ITEM_FAILED:
        {
            return { ...INITIAL_STATE, updateItemFailed: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case UPDATE_ITEM_STARTED:
        {
            return { ...INITIAL_STATE, updateItemStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case UPDATE_ITEM_SUCCESSFUL: {
            let oldListu = state.todoItems;
            let newListu = [];
            let updatedItem = action.payload;
            if (validate.isArray(oldListu)) {
                oldListu.map(item => {
                    if (item.id == updatedItem.id) {
                        newListu.push(updatedItem)
                    }
                    else {
                        newListu.push(item)
                    }
                })
            }
            return { 
                ...INITIAL_STATE,
                updateItemSuccessful: true,
                todoItemDetail: updatedItem,
                todoItems: newListu
            }
        }
        case ADD_DEPENDENCY_STARTED: {
            return { ...INITIAL_STATE, addDependencyStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case ADD_DEPENDENCY_FAILED: {
            return { ...INITIAL_STATE, addDependencyFailed: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case ADD_DEPENDENCY_SUCCESSFUL: {
            let dependent = action.payload.dependentTodoItem
            let depended = action.payload.dependedTodoItem
            let todoItemDetailNew = state.todoItemDetail;
            if (todoItemDetailNew.itemSummary.id == dependent.id) {
                todoItemDetailNew.dependedItem = depended
            }
            else {
                todoItemDetailNew.dependentItemList.push(dependent)
            }

            return { ...INITIAL_STATE, addDependencySuccessful: true, todoItems: state.todoItems, todoItemDetail: todoItemDetailNew}
        }
        case ADD_DEPENDENCY_STARTED: {
            return { ...INITIAL_STATE, removeDependencyStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case REMOVE_DEPENDENCY_STARTED: {
            return { ...INITIAL_STATE, removeDependencyStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case REMOVE_DEPENDENCY_FAILED: {
            return { ...INITIAL_STATE, removeDependencyFailed: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case REMOVE_DEPENDENCY_SUCCESSFUL: {
            let dependent = action.payload.dependentTodoItem
            let depended = action.payload.dependedTodoItem
            let todoItemDetailNew = state.todoItemDetail;
            if (todoItemDetailNew.itemSummary.id == dependent.id) {
                todoItemDetailNew.dependedItem = null
            }
            else {
                let newDependentItemList = []
                todoItemDetailNew.dependentItemList.map(item => {
                    if (item.id != dependent.id) {
                        newDependentItemList.push(item)
                    }
                })
                todoItemDetailNew.dependentItemList = newDependentItemList;
            }

            return { ...INITIAL_STATE, removeDependencySuccessful: true, todoItems: state.todoItems, todoItemDetail: todoItemDetailNew}
        }
        case UPDATE_STATUS_FAILED:
        {
            return { ...INITIAL_STATE, updateStatusFailed: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case UPDATE_STATUS_STARTED:
        {
            return { ...INITIAL_STATE, updateStatusStarted: true, todoItems: state.todoItems, todoItemDetail: state.todoItemDetail}
        }
        case UPDATE_STATUS_SUCCESSFUL: {
            let oldListus = state.todoItems;
            let newListus = [];
            let updatedItemId = action.payload.id;
            let newStatus = action.payload.status;
            if (validate.isArray(oldListus)) {
                oldListus.map(item => {
                    if (item.id == updatedItemId) {
                        item.status = newStatus
                    }
                    newListus.push(item)
                })
            }
            let newTodoItemDetailS = state.todoItemDetail
            newTodoItemDetailS.itemSummary.status = newStatus;
            return { 
                ...INITIAL_STATE,
                updateStatusSuccessful: true,
                todoItemDetail: newTodoItemDetailS,
                todoItems: newListus
            }

            
        }
        default: {
            return {state};
        }
    }
}