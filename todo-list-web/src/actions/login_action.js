import { 
    LOGIN_STARTED, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAILED, 
    REGISTER_STARTED, 
    REGISTER_FAILED, 
    LOGOUT_STARTED,
    LOGOUT_DONE,
    CHECK_LOGIN_STARTED
} from "../constants";
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, CHECK_LOGGED_IN_URL } from "../constants";

export const fetchLogin = (username, password) => {
    let data = { username, password }
    return async dispatch => {
        dispatchLoginStarted(dispatch)
        dispatchLogin(
            dispatch,
            await fetch(LOGIN_URL, {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                method: "POST",
                credentials: "include"
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return false;
            }).catch(error => {
                console.error(error)
                return false;
            })
        )

    }
}

export const fetchRegister = (username, password, passwordConfirm) => {
    let data = { username, password, passwordConfirm };

    return async dispatch => {
        dispatchRegisterStarted(dispatch);
        dispatchRegister(
            dispatch,
            await fetch(REGISTER_URL, {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    console.log("logged in")
                    return response.json()
                }

                return false;
            }).catch(error => {
                console.error(error)
                return false;
            })
        )
    }
}

export const fetchLogour = () => {

    return async dispatch => {
        dispatchLogoutStarted(dispatch);
        dispatchLogout(
            dispatch,
            await fetch(LOGOUT_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET",
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return false;
            }).catch(error => {
                console.error(error)
                return false;
            })
        )
    }
}

export const fetchIsLoggedIn = () => {

    return async dispatch => {
        dispatchCheckLoginStarted(dispatch)
        dispatchLogin(
            dispatch,
            await fetch(CHECK_LOGGED_IN_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET",
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }

                return false;
            }).catch(error => {
                console.error(error)
                return false;
            })
        )
    }
}

const dispatchLogin = (dispatch, data) => {
    dispatch({
        type: data == true ? LOGIN_SUCCESSFUL : LOGIN_FAILED,
        payload: data
    })
}

const dispatchRegister = (dispatch, data) => {
    dispatch({
        type: data === true ? LOGIN_SUCCESSFUL : REGISTER_FAILED,
        payload: data
    })
}

const dispatchLoginStarted = (dispatch) => {
    dispatch({
        type: LOGIN_STARTED
    })
}

const dispatchRegisterStarted = (dispatch) => {
    dispatch({
        type: REGISTER_STARTED
    })
}

const dispatchLogoutStarted = (dispatch) => {
    dispatch({
        type: LOGOUT_STARTED
    })
}

const dispatchCheckLoginStarted = (dispatch)=> {
    dispatch({
        type: CHECK_LOGIN_STARTED
    })
}

const dispatchLogout = (dispatch) => {
    dispatch({
        type: LOGOUT_DONE
    })
}
