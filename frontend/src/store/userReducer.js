// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    user: null,
    documents: null,
    selectedDocument: null
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DOCUMENTS:
            if (action.data) {
                var data = action.data;
                return {
                    ...state,
                    documents: data
                };
            } else {
                return {
                    ...state,
                    documents: null
                };
            }
        case actionTypes.SELECT_DOCUMENT:
            if (action.data) {
                var data = action.data;
                return {
                    ...state,
                    selectedDocument: data
                };
            } else {
                return {
                    ...state,
                    selectedDocument: null
                };
            }
        case actionTypes.LOGIN:
            if (action.data) {
                var data = action.data;
                return {
                    ...state,
                    user: data
                };
            } else {
                return {
                    ...state,
                    user: null
                };
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;
