import React, { Component } from "react";
import { connect } from "react-redux";
import { addDependency, removeDependency } from "../../actions/dependency_action"
import validate from "validate.js";
import moment from "moment"

import AlertModal from "../BsModalAlert"
import PickItemModal from "../PickItemModal"
import TodoItemPick from "../PickItemModal/TodoItemPick"

import Radium from "radium"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Accordion, Card } from "react-bootstrap";
import { style } from "../TodoItemDetailColumn/style"

class DependencyDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoItemDetail: null,
            status: false,
            dependedItem: null,
            dependentItemList: [],
            selectedDependedItemToAdd: null,
            selectedDependentItemToAdd: null,
            selectedDependedItemToRemove: null,
            selectedDependentItemToRemove: null,
            expired: false,
            loading: false,
            failed: false,
            showItemList: false,
            onItemSelected: null,
            itemSelected: null,
            itemId: 0,
            showAlert: false,
            alertDetails: {}

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
            itemId: item.itemSummary.id,
            failed: false
        })
    }

    componentWillReceiveProps(props) {
        if (props.loading != this.props.loading) {
            this.setState({
                loading: props.loading,
                failed: false
            })
        }
        if (this.props.addDependencyFailed != props.addDependencyFailed && props.addDependencyFailed) {
            this.props.onFail("Could not add dependency. There could be a circular dependency problem.")
        }
        if (this.props.addDependencySuccessful != props.addDependencySuccessful && props.addDependencySuccessful) {
            if (this.state.selectedDependedItemToAdd != null) {
                this.setState({
                    dependedItem: this.state.selectedDependedItemToAdd,
                    selectedDependedItemToAdd: null
                }, () => this.props.onSuccess("Successfully updated dependency"))
            }
            else {
                let dependentList = this.state.dependentItemList
                let exists = false
                dependentList.map(item => {
                    if (item.id == this.state.selectedDependentItemToAdd.id) {
                        exists = true
                    }
                })

                if (!exists) {
                    dependentList.push(this.state.selectedDependentItemToAdd)
                }

                this.setState({
                    dependentItemList: dependentList,
                    selectedDependentItemToAdd: null
                }, () => this.props.onSuccess("Succesfully added dependency"))
            }
        }
        if (this.props.removeDependencyFailed != props.removeDependencyFailed && props.removeDependencyFailed) {
            this.props.onFail("Could not remove dependency.")
        }
        if (this.props.removeDependencySuccessful != props.removeDependencySuccessful && props.removeDependencySuccessful) {
            if (this.state.selectedDependedItemToRemove != null) {
                this.setState({
                    dependedItem: null,
                    selectedDependedItemToRemove: null
                }, () => this.props.onSuccess("Succesfully removed dependency"))
            }
            else {
                let dependentList = this.state.dependentItemList
                let newDependentList = []
                dependentList.map(item => {
                    if (item.id != this.state.selectedDependentItemToRemove.id) {
                        newDependentList.push(item)
                    }
                })

                this.setState({
                    dependentItemList: newDependentList,
                    selectedDependentItemToRemove: null
                }, () => this.props.onSuccess("Succesfully removed dependency"))
            }
        }
    }

    onAddDepClicked = () => {
        if (!this.state.loading) {
            this.setState({
                showItemList: true,
                onItemSelected: this.onDependentSelected,
                failed: false
            })

        }
    }

    onDependentSelected = (item) => {
        if (item.status == true && this.state.status == false) {
            this.setState({
                showItemList: false,
            }, () => {
                this.props.onFail("A completed task cannot depend on an incomplete one.")
            })
        } else {
            this.setState({
                selectedDependentItemToAdd: item,
                showItemList: false,
            }, () => {
                this.props.onLoadingStateChange(true);
                this.props.addDependency(item, this.props.todoItemDetail.itemSummary)
            })
        }
    }

    onAddingDependentSuccess = () => {

    }

    onEditDepClicked = () => {
        if (!this.state.loading) {
            this.setState({
                showItemList: true,
                onItemSelected: this.onDependsOnSelected,
                failed: false
            })
        }

    }

    onDependsOnSelected = (item) => {
        let statusCheck = item.status == false && this.state.status == true
        let existsCheck = this.state.dependedItem != null && this.state.dependedItem.id == item.id
        if (statusCheck) {
            this.setState({
                showItemList: false,
            }, () => {
                this.props.onFail("A completed task cannot depend on an incomplete one.")
            })
        } else if (existsCheck) {
            this.setState({
                showItemList: false,
            }, () => {
                this.props.onFail("This dependency already exists")
            })
        } else {
            this.setState({
                selectedDependedItemToAdd: item,
                showItemList: false,
            }, () => {
                this.props.onLoadingStateChange(true);
                this.props.addDependency(this.props.todoItemDetail.itemSummary, item)
            })
        }
    }

    onDeleteDepended = (item) => {
        this.setState({
            showAlert: true,
            alertDetails: {
                body: "Are you sure to delete?",
                onOkay: () => this.onDeleteDependedConfirm(item),
                onClose: this.onDeleteCancel
            }
        })
    }

    onDeleteDependent = (item) => {
        this.setState({
            showAlert: true,
            alertDetails: {
                body: "Are you sure to delete this item?",
                onOkay: () => this.onDeleteDependentConfirm(item),
                onClose: this.onDeleteCancel
            }
        })
    }

    onDeleteDependedConfirm =(item) => {
        this.setState({
            showAlert: false,
            alertDetails: {},
            selectedDependedItemToRemove: item
        }, () => {
            this.props.onLoadingStateChange(true)
            this.props.removeDependency(this.state.todoItemDetail.itemSummary, item)
        })
    }

    onDeleteDependentConfirm = (item) => {
        this.setState({
            showAlert: false,
            alertDetails: {},
            selectedDependentItemToRemove: item
        }, () => {
            this.props.onLoadingStateChange(true)
            this.props.removeDependency(item, this.state.todoItemDetail.itemSummary)
        })
    }

    onDeleteCancel = () => {
        this.setState({
            showAlert: false,
            alertDetails: {}
        })
    }

    onPickItemModalClose = () => {
        this.setState({
            showItemList: false,
        })
    }


    renderDependedItem = (dependedItem) => {
        if (dependedItem == null) {
            return <div style={style.noneText}>None</div>;
        }
        return (
            <TodoItemPick
                key={dependedItem.id}
                dark={true}
                todoItem={dependedItem}
                onSelect={() => this.props.onDependencyItemSelected(dependedItem)}
                showDelete={true}
                onDelete={() => this.onDeleteDepended(dependedItem)} />
        )
    }

    renderDependentItemList = (dependentItemList) => {
        if (dependentItemList == null || dependentItemList.length == 0) {
            return <div style={style.noneText}>None</div>;
        }

        return (
            dependentItemList.map(item => {
                return (
                    <TodoItemPick
                        key={item.id}
                        dark={true}
                        todoItem={item}
                        onSelect={() => this.props.onDependencyItemSelected(item)}
                        showDelete={true}
                        onDelete={() => this.onDeleteDependent(item)} />
                )
            })
        )
    }

    render() {
        if (this.state.todoItemDetail == null) {
            return null;
        }
        let dependedItem = this.state.dependedItem;
        let dependentItemList = this.state.dependentItemList;

        return (
            <Accordion>
                <div style={style.hover} key={0}>
                    <Row style={style.accordionToggleRow}>
                        <Col xs={10}>
                            <Accordion.Toggle as={Card.Header} eventKey="0" style={style.toggler}>
                                Depends On
                            </Accordion.Toggle>
                        </Col>
                        <Col xs={2}>
                            <div style={style.iconContainer}>
                                <FontAwesomeIcon icon={faPen} style={style.editIcon} onClick={() => this.onEditDepClicked()} disabled={this.state.loading} />
                            </div>
                        </Col>
                    </Row>
                </div>

                <Accordion.Collapse eventKey="0">
                    <div>{this.renderDependedItem(dependedItem)}</div>
                </Accordion.Collapse>

                <div style={style.hover} key={1}>
                    <Row style={style.accordionToggleRow}>
                        <Col xs={10}>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style={style.toggler}>
                                Depended By
                            </Accordion.Toggle>
                        </Col>
                        <Col xs={2}>
                            <div style={style.iconContainer}>
                                <FontAwesomeIcon icon={faPlus} style={style.plusIcon} onClick={() => this.onAddDepClicked()} disabled={this.state.loading} />
                            </div>

                        </Col>
                    </Row>
                </div>
                <Accordion.Collapse eventKey="1">
                    <div>{this.renderDependentItemList(dependentItemList)}</div>
                </Accordion.Collapse>

                <PickItemModal
                    show={this.state.showItemList}
                    onOkay={(item) => this.state.onItemSelected(item)}
                    onClose={() => this.onPickItemModalClose()}
                    doNotShow={this.state.itemId} />
                <AlertModal
                    show={this.state.showAlert}
                    body={this.state.alertDetails.body}
                    onOkay={this.state.alertDetails.onOkay}
                    onClose={this.state.alertDetails.onClose} />
            </Accordion>
        )


    }
}



const mapStateToProps = (state) => {
    const {
        todoItemDetail,
        addDependencyFailed,
        addDependencySuccessful,
        removeDependencyFailed,
        removeDependencySuccessful
    } = state.todoItem
    return {
        todoItemDetail,
        addDependencyFailed,
        addDependencySuccessful,
        removeDependencyFailed,
        removeDependencySuccessful
    };
}

const bindAction = (dispatch) => {
    return {
        addDependency: (dependent, depended) => dispatch(addDependency(dependent, depended)),
        removeDependency: (dependent, depended) => dispatch(removeDependency(dependent, depended))
    }
}

export default connect(mapStateToProps, bindAction)(Radium(DependencyDetail));