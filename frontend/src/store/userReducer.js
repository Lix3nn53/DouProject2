// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    jwt: null
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.LOGIN:
            id = action.id;
            return {
                ...state,
                jwt: [id]
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                jwt: null
            };
        default:
            return state;
    }
};

export default userReducer;
