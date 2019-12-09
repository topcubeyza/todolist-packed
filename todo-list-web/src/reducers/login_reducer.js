import { 
    LOGIN_STARTED, 
    LOGIN_FAILED, 
    LOGIN_SUCCESSFUL, 
    REGISTER_STARTED, 
    REGISTER_FAILED, 
    LOGOUT_STARTED, 
    LOGOUT_DONE,
    CHECK_LOGIN_STARTED } from "../constants/reducer_types"

const INITIAL_STATE = {
    registerStarted: false,
    registerFailed: false,
    loginStarted: false,
    loginSuccessful: false,
    loginFailed: false,
    logoutStarted: false,
    logoutDone: false,
    checkingIfLoggedIn: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_STARTED:
        {
            return { ...INITIAL_STATE, loginStarted: true }
        }
        case LOGIN_SUCCESSFUL:
        {
            return { ...INITIAL_STATE, loginSuccessful: true }
        }
        case LOGIN_FAILED: {
            return { ...INITIAL_STATE, loginFailed: true}
        }
        case REGISTER_STARTED: {
            return { ...INITIAL_STATE, registerStarted: true}
        }
        case REGISTER_FAILED: {
            return { ...INITIAL_STATE, registerFailed: true}
        }
        case LOGOUT_STARTED: {
            return { ...INITIAL_STATE, logoutStarted: true}
        }
        case LOGOUT_DONE: {
            return { ...INITIAL_STATE, logoutDone: true}
        }
        case CHECK_LOGIN_STARTED: {
            return { ...INITIAL_STATE, checkingIfLoggedIn: true}
        }
        default: {
            return {state};
        }
    }
}