import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export function signin(formData, history){
    return async (dispatch) => {
        try {
            //log in the user
            const { data } = await api.signIn(formData)

            dispatch({ type: AUTH, data });

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
}

export function signup(formData, history){
    return async (dispatch) => {
        try {
            //Sign up the user
            const { data } = await api.signUp(formData)

            dispatch({ type: AUTH, data });

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
}