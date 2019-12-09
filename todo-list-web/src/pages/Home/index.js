import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { fetchUserLists } from "../../actions/user_lists_action"
import { fetchLogour } from "../../actions/login_action"
import validate from "validate.js";

import TodoListColumn from "../../components/TodoListColumn"
import TodoItemColumn from "../../components/TodoItemColumn"
import TodoItemDetailColumn from "../../components/TodoItemDetailColumn"

import Radium from "radium"
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { style } from "../Home/style"
import classes from "../Home/Home.css"

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirecToLogin: null,
            selectedList: null,
            selectedItem: null,
            showAddColumn: false,
            showDetailColumn: false
        }

    }

    componentWillReceiveProps(props) {
        debugger;
        if (props.logoutDone) {
            this.setState({
                redirecToLogin: true
            })
        }
        if (props.userListsFailed) {
            this.setState({
                redirecToLogin: true
            })
        } else if (validate.isArray(props.userLists)) {
            this.setState({
                redirecToLogin: false
            })
        }
    }

    componentDidMount() {
        this.props.fetchUserLists();
    }

    onListSelected = (list) => {
        if (this.state.selectedList == null || this.state.selectedList.id != list.id) {
            this.setState({
                selectedList: list
            })
        }
    }

    onListDeselected = () => {
        this.setState({
            selectedList: null,
            selectedItem: null,
            showAddColumn: false
        })
    }

    onItemSelected = (item) => {
        if (this.state.selectedItem == null || this.state.selectedItem.id != item.id) {
            this.setState({
                selectedItem: item,
                showAddColumn: false
            })
        }
    }

    onItemDeselected = () => {
        if (this.state.selectedItem != null) {
            this.setState({
                selectedItem: null,
            })
        }
    }

    onItemAdd = () => {
        if (!this.state.showAddColumn) {
            this.setState({
                showAddColumn: true,
                selectedItem: null
            })
        }
    }

    onThirdColumnCancelClick = () => {
        this.setState({
            showAddColumn: false,
            selectedItem: null
        })
    }

    onDependencyItemSelected = (item) => {
        if (this.state.selectedItem == null || this.state.selectedItem.id != item.id) {
            this.setState({
                selectedItem: item,
                showAddColumn: false
            })
        }
    }

    renderThirdColumn = () => {
        if (this.state.showAddColumn) {
            return <TodoItemDetailColumn 
                    key={0}
                    new={true} 
                    listId={this.state.selectedList.id}
                    onCancel={() => this.onThirdColumnCancelClick()}
                    />
        } else if (this.state.selectedItem != null) {
            return <TodoItemDetailColumn 
                    key={this.state.selectedItem.id}
                    new={false} 
                    todoItem={this.state.selectedItem} 
                    listId={this.state.selectedList.id}
                    onCancel={() => this.onThirdColumnCancelClick()}
                    onDependencyItemSelected={item => this.onDependencyItemSelected(item)}/>
        }

        return null;
    }

    render() {
        if (this.state.redirecToLogin == null) {
            return null;
        } else if (this.state.redirecToLogin == true) {
            console.log("not logged in, redirecting to login page")
            return <Redirect to="/" />
        }

        return (
            <div style={style.container}>
                <Container style={style.bsContainer} fluid={true} >
                    <Row style={style.row}>
                        <Col style={style.col}>
                            <div style={style.columnContainer}>
                                <TodoListColumn 
                                    onListSelected={(list) => this.onListSelected(list)}
                                    onListDeselected={() => this.onListDeselected()} />
                            </div>
                        </Col>
                        <Col style={style.col}>
                            <div style={style.columnContainer}>
                                <TodoItemColumn 
                                    todoList={this.state.selectedList} 
                                    onSelect={(item) => this.onItemSelected(item)}
                                    onAdd={() => this.onItemAdd()}/>
                            </div>
                        </Col>
                        <Col style={style.col}>
                            <div style={style.columnContainer}>
                            {this.renderThirdColumn()}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div 
                            style={style.logOutContainer}
                            onClick={this.props.logout}>Click here to log out</div>
                    </Row>

                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        userListsFailed,
        userLists,
    } = state.userDetail
    const {
        logoutDone
    } = state.login
    return { userLists, userListsFailed, logoutDone };
}

const bindAction = (dispatch) => {
    return {
        fetchUserLists: () => dispatch(fetchUserLists()),
        logout: () => dispatch(fetchLogour())
    }
}

export default connect(mapStateToProps, bindAction)(Radium(Home));