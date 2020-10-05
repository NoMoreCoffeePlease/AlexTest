import {combineReducers} from 'redux';
import {reducer as reduxReducer} from './redux/reducers'

const reducer = combineReducers({
    reduxV2 : reduxReducer,
});

export {reducer};