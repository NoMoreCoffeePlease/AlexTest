import {GET_COUNTRY} from './actions';

const initialState = {
    country: 'Romania'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRY: {
            const country = action.payload;
            return country;
        };
        default: return state;
    }
    
};

export {reducer};