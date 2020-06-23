import {combineReducers} from 'redux';
import auth from './authReducer';
import advert from './advertReducer';
import user from './userReducer';
import alert from './alertReducer';
import spinner from './spinnerReducer';

export default combineReducers({
    auth: auth,
    advert: advert,
    user: user,
    alert: alert,
    spinner: spinner,
});