import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { addTodoItem, getTodoItem, deleteTodoItem, updateTodoItem } from "../../actions/todo_items_actions"
import validate from "validate.js";
import moment from "moment"

import AlertModal from "../BsModalAlert"
import PickItemModal from "../PickItemModal"
import DependencyDetail from "../DependencyDetail"
import TodoItemTopRightAction from "../TodoItemTopRightAction"

import Radium from "radium"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Form, Button, Row, Accordion, Card } from "react-bootstrap";
import { style } from "../TodoItemDetailColumn/style"

class TodoItemDetailColumn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showAlert: false,
            alertDetails: {},
            todoItem: {},
            name: "",
            description: "",
            deadline: "",
            status: false,
            expired: false,
            createdOn: "",
            errorMessage: "",
            successMessage: "",
            loading: false,

        }
    }

    componentDidMount() {
        let item = this.props.todoItem;
        if (!this.props.new) {
            this.setState({
                todoItemDetail: null,
                name: item.name,
                description: item.description,
                deadline: item.deadline,
                status: item.status,
                expired: item.expired,
                loading: item.expired,
                failed: false,
                id: item.id,
                errorMessage: item.expired ? "This item is expired. You cannot modify it, you can only delete it." : ""
            }, () => {
                this.props.getTodoItem(this.props.todoItem.id)
            })
        }
    }

    componentWillReceiveProps(props) {
        if (props.new) {
            if (this.state.loading != props.addTodoItemStarted && props.addTodoItemStarted) {
                this.setState({
                    failed: false,
                    loading: props.addTodoItemStarted,
                })
            }
            if (this.state.failed != props.addTodoItemFailed && props.addTodoItemFailed) {
                this.setState({
                    failed: true,
                    errorMessage: "Could not save. Try again..."
                }, () => this.props.onCancel())
            }
            if (props.addTodoItemSuccessful) {
                this.props.onCancel()
            }
        }
        else {
            if ((this.state.todoItemDetail == null && props.todoItemDetail != null) || this.state.todoItemDetail != props.todoItemDetail) {
                this.setState({
                    todoItemDetail: props.todoItemDetail
                })
            }
            if (this.state.loading != props.deleteItemStarted && props.deleteItemStarted) {
                this.setState({
                    failed: false,
                    loading: props.deleteItemStarted,
                    successMessage: ""
                })
            }
            if (this.state.failed != props.deleteItemFailed && props.deleteItemFailed) {
                this.setState({
                    failed: true,
                    errorMessage: "Could not delete. Try again...",
                    successMessage: ""
                })
            }
            if (this.state.loading != props.updateItemStarted && props.updateItemStarted) {
                this.setState({
                    failed: false,
                    loading: props.updateItemStarted,
                    successMessage: ""
                })
            }
            if (this.state.failed != props.updateItemFailed && props.updateItemFailed) {
                this.setState({
                    failed: true,
                    errorMessage: "Could not delete. Try again...",
                    successMessage: ""
                })
            }
            if (this.props.updateItemSuccessful != props.updateItemSuccessful && props.updateItemSuccessful) {
                this.setState({
                    failed: false,
                    loading: false,
                    successMessage: "Successfully updated"
                })
            }
        }
    }

    onNameChange = (value) => {
        this.setState({
            name: value,
            errorMessage: ""
        })
    }

    onDescriptionChange = (value) => {
        this.setState({
            description: value,
            errorMessage: ""
        })
    }

    onDateChange = (value) => {
        this.setState({
            deadline: value,
            errorMessage: ""
        })
    }

    onStatusChange = (value) => {
        if (this.state.dependedItem != null && this.state.dependedItem.status == false) {
            this.setState({
                errorMessage: "Depended item is not yet complete!"
            })
        }
        else {
            this.setState({
                status: value
            })
        }
    }

    onSave = () => {
        if (this.state.name.trim().length == 0) {
            this.setState({
                errorMessage: "Please enter a name"
            })
            return;
        }
        if (this.state.description.trim().length == 0) {
            this.setState({
                errorMessage: "Please enter a description"
            })
            return;
        }
        var date = moment(this.state.deadline, "DD-MM-YYYY")
        if (this.state.deadline.trim().length < 10 || !date.isValid()) {
            this.setState({
                errorMessage: "Please enter a valid date. Ex: 21-01-2019"
            })
            return;
        }
        var today = moment(new Date());
        if (today.isSameOrAfter(date)) {
            this.setState({
                errorMessage: "Please enter a date later than today"
            })
            return;
        }

        let todoItem = {
            name: this.state.name,
            description: this.state.description,
            deadline: this.state.deadline,
            todoListId: this.props.listId
        }

        this.props.addTodoItem(todoItem);

    }

    onUpdate = () => {
        if (this.state.name.trim().length == 0) {
            this.setState({
                errorMessage: "Please enter a name"
            })
            return;
        }
        if (this.state.description.trim().length == 0) {
            this.setState({
                errorMessage: "Please enter a description"
            })
            return;
        }
        var date = moment(this.state.deadline, "DD-MM-YYYY")
        if (this.state.deadline.trim().length < 10 || !date.isValid()) {
            this.setState({
                errorMessage: "Please enter a valid date. Ex: 21-01-2019"
            })
            return;
        }
        var today = moment(new Date());
        if (today.isSameOrAfter(date)) {
            this.setState({
                errorMessage: "Please enter a date later than today"
            })
            return;
        }

        let todoItem = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            deadline: this.state.deadline,
            todoListId: this.props.listId,
        }

        this.props.updateTodoItem(todoItem);
    }

    onDelete = () => {
        this.setState({
            showAlert: true,
            alertDetails: {
                body: "Are you sure to delete this item? All dependencies will be lost!",
                onOkay: this.onDeleteConfirm,
                onClose: this.onDeleteCancel
            }
        })
    }

    onDeleteConfirm = () => {
        this.props.onCancel();
        this.props.deleteTodoItem(this.props.todoItem.id)
    }

    onDeleteCancel = () => {
        this.setState({
            showAlert: false,
            alertDetails: {}
        })
    }

    onLoadingStateChange = (loadingState) => {
        this.setState({
            loading: loadingState,
            successMessage: "",
            errorMessage: ""
        })
    }

    onSuccess = (message) => {
        this.setState({
            loading: false,
            successMessage: message,
            errorMessage: ""
        })
    }

    onFail = (message) => {
        this.setState({
            loading: false,
            successMessage: "",
            errorMessage: message
        })
    }

    renderDependencies = () => {
        if (this.props.new) {
            return null;
        }
        if (this.state.todoItemDetail == null) {
            return null;
        }

        return (
            <DependencyDetail
                todoItemDetail={this.state.todoItemDetail}
                loading={this.state.loading}
                onLoadingStateChange={this.onLoadingStateChange}
                onSuccess={this.onSuccess}
                onFail={this.onFail}
                onDependencyItemSelected={this.props.onDependencyItemSelected} />
        )
    }

    renderBody = () => {
        return (
            <div key={this.props.new ? 0 : this.props.todoItem.id} disabled={this.state.loading}>
                <Form.Group as={Row} controlId="formPlaintextName" style={style.formGroup}>
                    <Form.Label column sm="3" style={style.labelContainer}>
                        Name
                        </Form.Label>
                    <Col sm="9" style={style.controlContainer}>
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Name of task" style={style.control}
                            onChange={e => this.onNameChange(e.target.value)}
                            value={this.state.name}
                            disabled={this.state.loading} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextName" style={style.formGroup}>
                    <Form.Label column sm="3" style={style.labelContainer}>
                        Description
                        </Form.Label>
                    <Col sm="9" style={style.controlContainer}>
                        <Form.Control
                            as="textarea"
                            size="sm"
                            placeholder="Description of task"
                            style={style.control}
                            onChange={e => this.onDescriptionChange(e.target.value)}
                            value={this.state.description}
                            disabled={this.state.loading} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextName" style={style.formGroup}>
                    <Form.Label column sm="3" style={style.labelContainer}>
                        Deadline
                        </Form.Label>
                    <Col sm="9" style={style.controlContainer}>
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Deadline (ex: 21-01-2019)"
                            style={style.control}
                            onChange={e => this.onDateChange(e.target.value)}
                            value={this.state.deadline}
                            disabled={this.state.loading} />
                    </Col>
                </Form.Group>
                {this.renderDependencies()}

            </div>
        );
    }

    renderMessage = () => {
        if (this.state.errorMessage.length > 0) {
            return (
                <div style={style.errorMessage}>{this.state.errorMessage}</div>
            )
        }
        if (this.state.successMessage.length > 0) {
            return (
                <div style={style.successMessage}>{this.state.successMessage}</div>
            )
        }
        return null;
    }

    renderButtons = () => {
        if (this.props.new) {
            return (
                <div style={style.buttonsContainer}>
                    {this.renderMessage()}
                    <Button variant="success" style={style.saveButton} onClick={() => this.onSave()} disabled={this.state.loading}>SAVE</Button>
                </div>
            )
        }
        else {
            return (
                <div style={style.buttonsContainer}>
                    {this.renderMessage()}
                    <div style={style.buttonsRow}>
                        <Button variant="danger" style={style.button} onClick={() => this.onDelete()} disabled={this.state.loading ? !this.state.expired : false}>DELETE</Button>
                        <Button variant="primary" style={style.button} onClick={() => this.onUpdate()} disabled={this.state.loading}>UPDATE</Button>
                    </div>
                </div>
            )
        }
    }

    renderTopRightIcon() {
        if (this.state.todoItemDetail == null) {
            return null
        }
        return (
            <TodoItemTopRightAction 
                todoItemDetail={this.state.todoItemDetail}
                onLoadingStateChange={this.onLoadingStateChange}
                onFail={this.onFail}
                onSuccess={this.onSuccess} />
        )
    }

    render() {
        return (
            <div style={style.main}>
                <Container >
                    <Row style={style.headerContainer}>
                        <Col xs={8}>
                            <div style={style.headerTextContainer}>
                                <span style={style.headerText}>
                                    {this.state.name.length == 0 ? "Add new todo" : this.state.name}
                                </span>
                            </div>
                        </Col>

                        <Col xs={4}>
                            <div style={style.headerPlusContainer}>
                                {this.renderTopRightIcon()}
                            </div>

                        </Col>
                    </Row>
                </Container>
                <Container style={style.bodyContainer}>
                    {this.renderBody()}
                    {this.renderButtons()}
                </Container>
                <AlertModal
                    show={this.state.showAlert}
                    body={this.state.alertDetails.body}
                    onOkay={this.state.alertDetails.onOkay}
                    onClose={this.state.alertDetails.onClose} />

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {
        addTodoItemStarted,
        addTodoItemFailed,
        addTodoItemSuccessful,
        getTodoItemStarted,
        getTodoItemSuccessful,
        getTodoItemFailed,
        updateItemStarted,
        updateItemFailed,
        updateItemSuccessful,
        deleteItemSuccessful,
        deleteItemFailed,
        deleteItemStarted,
        todoItemDetail
    } = state.todoItem
    return {
        addTodoItemStarted,
        addTodoItemFailed,
        addTodoItemSuccessful,
        getTodoItemStarted,
        getTodoItemSuccessful,
        getTodoItemFailed,
        updateItemStarted,
        updateItemFailed,
        updateItemSuccessful,
        deleteItemSuccessful,
        deleteItemFailed,
        deleteItemStarted,
        todoItemDetail
    };
}

const bindAction = (dispatch) => {
    return {
        addTodoItem: (todoItem) => dispatch(addTodoItem(todoItem)),
        getTodoItem: (id) => dispatch(getTodoItem(id)),
        deleteTodoItem: (id) => dispatch(deleteTodoItem(id)),
        updateTodoItem: (todoItem) => dispatch(updateTodoItem(todoItem))
    }
}

export default connect(mapStateToProps, bindAction)(Radium(TodoItemDetailColumn));