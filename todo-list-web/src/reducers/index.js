import { combineReducers } from "redux";
import login from "./login_reducer";
import userDetail from "./user_detail_reducer"
import todoItem from "./todo_items_reducer"
import filterOrder from "./filter_order_reducer"

export default combineReducers({
    login,
    userDetail,
    todoItem,
    filterOrder
});