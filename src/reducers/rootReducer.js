import characterReducer from './characterReducer';
import counterReducer from './counterReducer';
import todoReducer from './todoReducer';
import {combineReducers} from 'redux';
import {addNewHomeReducer} from "./addNewHomeReducer";

//Combine all the sub reducers
const rootReducer = combineReducers({
    characters: characterReducer,
    myCounter: counterReducer,
    addNewHome: addNewHomeReducer,
    todos:todoReducer
})

export default rootReducer