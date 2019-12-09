import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { fetchLogin, fetchRegister, fetchIsLoggedIn } from "../../actions"
import { style } from "./style.js"

import { Container, Col, Form, Button, Row } from "react-bootstrap";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameLogin: "",
            passwordLogin: "",
            usernameRegister: "",
            passwordRegister: "",
            passwordConfirmRegister: "",
            redirectToHome: null,
            loginError: "",
            registerError: "",

        }

    }

    componentDidMount() {
        this.props.fetchIsLoggedIn();
    }

    componentWillReceiveProps(props) {
        if (props.loginSuccessful) {
            this.setState({
                redirectToHome: true
            })
        }
        else if (props.loginFailed) {
            this.setState({
                loginError: "Could not log you in. Please check fields..."
            })
        }
        else if (props.registerFailed) {
            this.setState({
                registerError: "Could not register you. Please check fields..."
            })
        }
    }

    onUsernameLoginChange = (usernameLogin) => {
        this.setState({
            usernameLogin,
            loginError: ""
        })
    }

    onPasswordLoginChange = (passwordLogin) => {
        this.setState({
            passwordLogin,
            loginError: ""
        })
    }

    onUsernameRegisterChange = (usernameRegister) => {
        this.setState({
            usernameRegister,
            registerError: ""
        })
    }

    onPasswordRegisterChange = (passwordRegister) => {
        this.setState({
            passwordRegister,
            registerError: ""
        })
    }

    onPasswordConfirmRegisterChange = (passwordConfirmRegister) => {
        this.setState({
            passwordConfirmRegister,
            registerError: ""
        })
    }

    onLoginSubmit = () => {
        if (this.state.usernameLogin.trim().length > 0 && this.state.passwordLogin.length > 0) {
            this.setState({loginError: ""})
            this.props.fetchLogin(this.state.usernameLogin, this.state.passwordLogin);
        } else {
            this.setState({
                loginError: "Please fill all fields...",
                registerError: "",
            })
        }
    }

    onRegisterSubmit = () => {
        if (
            this.state.usernameRegister.trim().length == 0 && 
            this.state.passwordRegister.length == 0) {
                this.setState({
                    registerError: "Please fill all fields...",
                    loginError: ""
                })
        }
        else if (this.state.passwordRegister !== this.state.passwordConfirmRegister) {
            this.setState({
                registerError: "Passwords do not match...",
                loginError: ""
            })
        } else {
            this.setState({
                registerError: ""
            })
            this.props.fetchRegister(this.state.usernameRegister, this.state.passwordRegister, this.state.passwordConfirmRegister)

        }
    }

    render() {
        if (this.props.checkingIfLoggedIn) {
            return (
                <div style={style.container}>
                    <p>Loading... Please wait...</p>
                </div>
            );
        }
        if (this.state.redirectToHome) {
            return <Redirect to="/home" />
        }
        return (
            <div  style={style.container}>
            <Container>
                <Row>
                    <div style={style.headerContainer}>
                        <p style={style.headerText}>TODO LIST</p>
                    </div>
                </Row>
                <Row>
                <Col>
                    <div style={style.loginBoxContainer}>
                    <div style={style.loginTextContainer}>
                        <p style={style.loginText}>Login</p>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                onChange={(event) => this.onUsernameLoginChange(event.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                onChange={(event) => this.onPasswordLoginChange(event.target.value)} />
                        </Form.Group>
                        <Button variant="success" size="lg" type="button" onClick={() => this.onLoginSubmit()}>
                            Submit
                        </Button>
                    </Form>
                    </div>
                    
                    {
                        this.state.loginError.length > 0 ?
                        <div style={style.errorTextContainer}>
                            <p style={style.errorText}>{this.state.loginError}</p>
                        </div>
                        :
                        null
                    }
                    
                </Col>
                <Col>
                <div style={style.loginBoxContainer}>
                    <div style={style.loginTextContainer}>
                        <p style={style.loginText}>Register</p>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                onChange={(event) => this.onUsernameRegisterChange(event.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                onChange={(event) => this.onPasswordRegisterChange(event.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password again" 
                                onChange={(event) => this.onPasswordConfirmRegisterChange(event.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" size="lg" type="button" onClick={() => this.onRegisterSubmit()}>
                            Submit
                        </Button>
                    </Form>
                    </div>
                    
                    {
                        this.state.registerError.length > 0 ?
                        <div style={style.errorTextContainer}>
                            <p style={style.errorText}>{this.state.registerError}</p>
                        </div>
                        :
                        null
                    }
                </Col>
                </Row>
            </Container>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { 
        loginSuccessful, 
        checkingIfLoggedIn,
        loginFailed,
        loginStarted,
        registerStarted,
        registerFailed } = state.login;

    return { loginSuccessful, checkingIfLoggedIn, loginFailed, registerFailed };
}

const bindAction = (dispatch) => {
    return {
        fetchLogin: (email, password) => dispatch(fetchLogin(email, password)),
        fetchRegister: (email, password, passwordConfirm) => dispatch(fetchRegister(email,password,passwordConfirm)),
        fetchIsLoggedIn: () => dispatch(fetchIsLoggedIn())
    }
}

export default connect(mapStateToProps, bindAction)(Login);