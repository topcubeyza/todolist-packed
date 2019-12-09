import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStatus } from "../../actions/todo_items_actions"
import validate from "validate.js";
import moment from "moment"

import Radium from "radium"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'

class TodoItemTopRightAction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoItemDetail: null,
            status: false,
            dependedItem: null,
            dependentItemList: [],
            expired: false,
            loading: false,
        }
    }

    componentDidMount() {
        let item = this.props.todoItemDetail;
        this.setState({
            todoItemDetail: item,
            status: item.itemSummary.status,
            dependedItem: item.dependedItem,
            dependentItemList: item.dependentItemList,
            expired: item.itemSummary.expired,
            loading: this.props.loading,
        })
    }

    componentWillReceiveProps(props) {
        if (props.loading != this.props.loading) {
            this.setState({
                loading: props.loading
            })
        }
        if (this.props.updateStatusFailed != props.updateStatusFailed && props.updateStatusFailed) {
            this.props.onFail("Could not update status.")
        }
        if (this.props.updateStatusSuccessful != props.updateStatusSuccessful && props.updateStatusSuccessful) {
            this.setState({
                status: !this.state.status
            }, () => this.props.onSuccess("Successfully updated dependency"))
        }
    }

    onStatusClicked = () => {
        if (!this.state.loading) {
            let markComplete = !this.state.status;
            // if we are going to mark an item as complete
            if (markComplete) {
                if (this.state.dependedItem != null && this.state.dependedItem.status == false){
                    this.props.onFail("This item depends on an incomplete item. Complete that one first.")
                }
                else {
                    this.props.onLoadingStateChange(true)
                    this.props.updateStatus(this.state.todoItemDetail.itemSummary.id, !this.state.status)
                }
            } else {
                if (this.checkIfThereAreCompleteDependents()) {
                    this.props.onFail("There are complete items depending on this one. Cannot mark incomplete.")
                }
                else {
                    this.props.onLoadingStateChange(true)
                    this.props.updateStatus(this.state.todoItemDetail.itemSummary.id, !this.state.status)
                }
            }
        }
    }

    checkIfThereAreCompleteDependents = () => {
        let thereAre = false;
        let dependentItemList = this.state.dependentItemList;
        if (dependentItemList == null || dependentItemList.length == 0) {
            return false;
        }
        else {
            dependentItemList.map(item => {
                if (item.status) {
                    thereAre = true
                }
            })
        }

        return thereAre;
    }

    render() {
        if (this.state.todoItemDetail == null) {
            return null;
        }

        let icon;
        let iconStyle;
        if (this.state.status) {
            icon = faCheckCircle;
            iconStyle = {
                cursor: "pointer",
                fontSize: "2rem",
                color: "#83ff4d"
            }
        }
        else if (!this.state.status && this.state.expired) {
            icon = faBan;
            iconStyle = {
                cursor: "pointer",
                fontSize: "2rem",
                color: "#d63827"
            }
        }
        else {
            icon = faCheckCircle;
            iconStyle = {
                cursor: "pointer",
                fontSize: "2rem",
                color: "grey"
            }
        }

        return (
            <FontAwesomeIcon icon={icon} style={iconStyle} onClick={() => this.onStatusClicked()} disabled={this.state.loading} />
        )


    }
}



const mapStateToProps = (state) => {
    const {
        todoItemDetail,
        updateStatusStarted,
        updateStatusFailed,
        updateStatusSuccessful
    } = state.todoItem
    return {
        todoItemDetail,
        updateStatusStarted,
        updateStatusFailed,
        updateStatusSuccessful
    };
}

const bindAction = (dispatch) => {
    return {
        updateStatus: (id, status) => dispatch(updateStatus(id, status)),
    }
}

export default connect(mapStateToProps, bindAction)(Radium(TodoItemTopRightAction));