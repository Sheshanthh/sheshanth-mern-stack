import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        user: null,
        error: null,
        isUpdated: false,
        message: null,
    },
    reducers: {
        loginRequest(state) {
            return {
                ...state,
                loading: true,
            };
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearError(state) {
            return {
                ...state,
                error: null,
            };
        },
        registerRequest(state) {
            return {
                ...state,
                loading: true,
            };
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        loadUserRequest(state) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            };
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };
        },
        loadUserFail(state) {
            return {
                ...state,
                loading: false,
            };
        },
        logoutSuccess(state) {
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload,
            };
        },
        updateProfileRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false,
            };
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true,
            };
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearUpdateProfile(state) {
            return {
                ...state,
                isUpdated: false,
            };
        },
        updatePasswordRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false,
            };
        },
        updatePasswordSuccess(state) {
            return {
                ...state,
                loading: false,
                isUpdated: true,
            };
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        forgotPasswordRequest(state) {
            return {
                ...state,
                loading: true,
                message: null,
            };
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        resetPasswordRequest(state) {
            return {
                ...state,
                loading: true,
            };
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
    },
});

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordSuccess,
    updatePasswordRequest,
    forgotPasswordFail,
    forgotPasswordSuccess,
    forgotPasswordRequest,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
} = actions;

export default reducer;
