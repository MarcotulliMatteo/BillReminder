import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

//State
const initialState = {
    isLoggedIn: false
}

//Actions
export const setUserLoggin = () => {
    return {
        type: 'USER_LOGIN'
    }
}

export const setUserLogout = () => {
    return {
        type: 'USER_LOGOUT'
    }
}

//Reducer
const isLoggedInFunc = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                isLoggedIn: true
            }
            break;
        case 'USER_LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            }
            break;
        default:
            return state;
            break;
    }
}

//Root Reducer
const rootReducer = combineReducers({
    isLoggedInFunc
});

//Persist Config
const presistConfig = {
    key: 'root',
    storage: AsyncStorage
}

//Persist Reducer
const presistedReducer = persistReducer(presistConfig, rootReducer)

//Redux Store
export default () => {
    let reduxStore = createStore(presistedReducer);
    let persister = persistStore(reduxStore);
    return {reduxStore, persister};
}




