import React, { Component } from "react";
import { connect } from "react-redux";
import { addList, deleteList } from "../../actions/user_lists_action"
import validate from "validate.js";

import TodoListRow from "../TodoListRow"
import AlertModal from "../BsModalAlert"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, InputGroup, Button, Row, FormControl, Spinner } from "react-bootstrap";
import { style } from "../TodoListColumn/style"

class TodoListColumn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewList: false,
            newListName: "",
            newListError: "",
            selectedId: 0,
            pendingDeleteId: 0,
            userLists: [],
            showAlert: false,
            deleteCandidateId: 0,
            alertDetails: {}
        }
    }

    componentDidMount() {
        this.setState({
            userLists: this.props.userLists
        })
    }

    componentWillReceiveProps(props) {
        if (this.props == props){
            return;
        }
        if (props.addListSuccessful != this.props.addListSuccessful && props.addListSuccessful) {
            this.setState({
                showNewList: false,
                newListName: "",
                newListError: "",
                userLists: props.userLists
            })
        }
        if (props.addListFailed && props.addListFailed != this.props.addListFailed) {
            this.setState({
                newListError: "Could not add. Try again...",
                userLists: props.userLists
            })
        }

        if (props.deleteListSuccessful && props.deleteListSuccessful != this.props.deleteListSuccessful) {
            this.setState({
                pendingDeleteId: 0,
                selectedId: 0,
                userLists: props.userLists
            }, () => {
                validate.isFunction(this.props.onListDeselected) ? this.props.onListDeselected() : null
            })
        }
        if (props.deleteListFailed && props.deleteListFailed != this.props.deleteListFailed) {
            this.setState({
                pendingDeleteId: 0,
                selectedId: 0,
                newListError: "Deleting failed. Try again..."
            }, () => {
                validate.isFunction(this.props.onListDeselected) ? this.props.onListDeselected() : null
            })
        }
    }

    onPlusClicked = () => {
        this.setState({
            showNewList: true,
            selectedId: 0
        }, () => {
            this.props.onListDeselected()
        })
    }

    onNewListNameChange = (value) => {
        this.setState({
            newListName: value.target.value,
            newListError: ""
        })
    }

    addNewTodoList = () => {
        if (this.state.newListName.trim().length == 0) {
            this.setState({
                newListError: "Please enter a name..."
            })
        }
        else {
            this.props.addList(this.state.newListName);
        }
    }

    onListSelected = (list) => {
        if (!(this.state.deleteCandidateId == list.id || this.state.pendingDeleteId == list.id)) {
            this.setState({
                selectedId: list.id,
                showNewList: false
            }, () => {
                this.props.onListSelected(list)
            })
        }
    }

    onListDeleteClicked = (id) => {
        this.setState({
            showAlert: true,
            deleteCandidateId: id,
            showNewList: false,
            alertDetails: {
                body: "Are you sure to delete? All your todos under this list will also be removed.",
                ok: "Yes",
                close: "Cancel",
                onClose: this.onDeleteCanceled,
                onOkay: this.onDeleteConfirmed
            }
        })
    }

    onDeleteConfirmed = () => {
        this.setState({
            pendingDeleteId: this.state.deleteCandidateId,
            showAlert: false,
            alertDetails: {}
        }, () => {
            this.props.deleteList(this.state.deleteCandidateId)
        })
    }

    onDeleteCanceled = () => {
        this.setState({
            deleteCandidateId: 0,
            showAlert: false,
            alertDetails: {}
        })
    }

    renderTodoLists = () => {
        let selectedId = this.state.selectedId;
        return this.state.userLists.map((list) => {
            let isSelected = list.id == selectedId
            return (
                <TodoListRow 
                    todoList={list} 
                    key={list.id} 
                    isSelected={isSelected} 
                    onSelect={() => this.onListSelected(list)}
                    onDelete={() => this.onListDeleteClicked(list.id)}
                />
            )
        })
    }

    renderNewListError = () => {
        if (this.state.newListError.length > 0) {
            return (
                <span style={{color: "orange"}}>{this.state.newListError}</span>
            )
        }
    }

    renderNewTodoList = () => {
        if (this.state.showNewList) {
            return (
                <Row style={style.newListRow}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Name"
                                aria-label="Name"
                                aria-describedby="basic-addon2"
                                onChange={(value) => this.onNewListNameChange(value)}
                                disabled={this.props.addListStarted}
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-success" 
                                    onClick={() => this.addNewTodoList()}
                                    disabled={this.props.addListStarted}>
                                    {this.props.addListStarted ?
                                        (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        )
                                        :
                                        "Add"
                                    }
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                </Row>
            );
        }

        return null;
    }

    render() {
        return (
            <div style={style.main}>
                <Container >
                    <Row style={style.headerContainer}>
                        <Col xs={8}>
                            <div style={style.headerTextContainer}>
                                <span style={style.headerText}>MY TODO LISTS</span>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div style={style.headerPlusContainer}>
                                <FontAwesomeIcon icon={faPlus} style={style.plusIcon} onClick={() => this.onPlusClicked()} />
                            </div>

                        </Col>
                    </Row>
                </Container>
                <Container style={style.bodyContainer}>
                    {this.renderTodoLists()}
                    {this.renderNewTodoList()}
                    {this.renderNewListError()}
                </Container>
                <AlertModal 
                    show={this.state.showAlert} 
                    body={this.state.alertDetails.body}
                    ok={this.state.alertDetails.ok} 
                    close={this.state.alertDetails.close}
                    onClose={this.state.alertDetails.onClose} 
                    onOkay={this.state.alertDetails.onOkay} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        userLists,
        addListStarted,
        addListSuccessful,
        addListFailed,
        deleteListStarted,
        deleteListSuccessful,
        deleteListFailed
    } = state.userDetail
    return { 
        userLists,
        addListFailed,
        addListStarted,
        addListSuccessful,
        deleteListFailed,
        deleteListStarted,
        deleteListSuccessful
    };
}

const bindAction = (dispatch) => {
    return {
        addList: (name) => dispatch(addList(name)),
        deleteList:(name) => dispatch(deleteList(name))
    }
}

export default connect(mapStateToProps, bindAction)(TodoListColumn);