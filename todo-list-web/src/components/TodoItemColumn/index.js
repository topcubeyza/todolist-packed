import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodoItems } from "../../actions/todo_items_actions"
import validate from "validate.js";

import AlertModal from "../BsModalAlert"
import TodoItemRow from "../TodoItemRow"
import FilterOrder from "../FilterOrder"

import Radium from "radium";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSortAmountDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { style } from "../TodoItemColumn/style"

class TodoItemColumn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todoItems: null,
            todoList: null,
            alertDetails: {},
            selectedId: 0,
            filtered: false,
            filteredTodoList: [],
            showFOModal: false,
            foTodoItems: null
        }
    }

    componentWillReceiveProps(props) {
        if (props.todoList != null && (this.props.todoList == null || this.props.todoList.id != props.todoList.id)) {
            this.props.fetchTodoItems(props.todoList.id);
        }
        if (this.state.todoItems != props.todoItems && props.todoItems != null) {
            this.setState({
                todoItems: props.todoItems
            })
        }
        if (props.foTodoItems != this.state.foTodoItems) {
            this.setState({
                foTodoItems: props.foTodoItems
            })
        }
    }

    onPlusClicked = () => {
        this.setState({
            selectedId: 0,
        }, () => {
            this.props.onAdd();
        })
    }

    filterModalKey = 1;
    onFOClicked = () => {
        this.filterModalKey++
        this.setState({
            showFOModal: true
        })
    }

    onApplyFilters = () => {
        this.setState({
            showFOModal: false
        })
    }

    onClearFilters = () => {
        this.setState({
            showFOModal: false
        })
    }

    onCloseFilterModal = () => {
        this.setState({
            showFOModal: false
        })
    }

    onTodoItemSelected = (todoItem) => {
        this.setState({
            selectedId: todoItem.id
        }, () => {
            this.props.onSelect(todoItem)
        })
    }

    renderTodoItems = () => {
        let itemsToRender = this.state.foTodoItems == null ?
            this.state.todoItems
            :
            this.state.foTodoItems
        
            if (!validate.isArray(itemsToRender)) {
                return null;
            }
        return itemsToRender.map(todoItem => {
            let isSelected = todoItem.id == this.state.selectedId
            return <TodoItemRow
                todoItem={todoItem}
                onSelect={() => this.onTodoItemSelected(todoItem)}
                isSelected={isSelected} />
        })
    }

    render() {
        if (this.props.todoList == null) {
            return (
                <div style={style.noItemContainer}>
                    <p style={style.noItemText}>Select a list from the left pane to see todo items.</p>
                </div>
            )
        }
        else if (this.props.getTodoItemsFailed) {
            return (
                <div style={style.noItemContainer}>
                    <p style={style.noItemText}>Something went wrong. Please try again...</p>
                </div>
            )
        }
        else if (this.props.getTodoItemsStarted) {
            return (
                <div style={style.noItemContainer}>
                    <p style={style.noItemText}>Please wait while items are loading...</p>
                </div>
            )
        }
        return (
            <div style={style.main}>
                <Container >
                    <Row style={style.headerContainer}>
                        <Col xs={8}>
                            <div style={style.headerTextContainer}>
                                <span style={style.headerText}>{this.props.todoList.name}</span>
                            </div>
                        </Col>
                        <Col xs={4} style={{ paddingRight: 0 }}>
                            <div style={style.headerIconsContainer}>

                                <div style={style.headerIconContainer} onClick={() => this.onFOClicked()}>
                                    <FontAwesomeIcon icon={faFilter} style={style.icon} />
                                    <FontAwesomeIcon icon={faSortAmountDown} style={style.icon} />
                                </div>
                                <div style={style.headerIconContainer}>
                                    <FontAwesomeIcon icon={faPlus} style={style.plusIcon} onClick={() => this.onPlusClicked()} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container style={style.bodyContainer}>
                    {this.renderTodoItems()}
                </Container>
                <AlertModal
                    show={this.state.showAlert}
                    body={this.state.alertDetails.body}
                    ok={this.state.alertDetails.ok}
                    close={this.state.alertDetails.close}
                    onClose={this.state.alertDetails.onClose}
                    onOkay={this.state.alertDetails.onOkay} />
                <FilterOrder
                    key={this.filterModalKey}
                    show={this.state.showFOModal}
                    onClear={this.onClearFilters}
                    onApply={this.onApplyFilters}
                    onClose={this.onCloseFilterModal}
                    todoListId={this.props.todoList.id} />

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {
        todoItems,
        getTodoItemsStarted,
        getTodoItemsSuccessful,
        getTodoItemsFailed
    } = state.todoItem
    const {
        foTodoItems,
    } = state.filterOrder
    return {
        todoItems,
        getTodoItemsStarted,
        getTodoItemsSuccessful,
        getTodoItemsFailed,
        foTodoItems
    };
}

const bindAction = (dispatch) => {
    return {
        fetchTodoItems: (id) => dispatch(fetchTodoItems(id))
    }
}

export default connect(mapStateToProps, bindAction)(Radium(TodoItemColumn));