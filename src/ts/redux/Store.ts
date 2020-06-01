import {createStore,combineReducers,Store} from 'redux'
import {ComponentReducer, CustomerReducer} from '.'
import {StateTypes} from '..'


const RootReducer = combineReducers({
    Components : ComponentReducer,
    Customers  : CustomerReducer
})
//sync store across tabs
//redux-state-sync - https://www.npmjs.com/package/redux-state-sync
export const store: Store<StateTypes> = createStore(RootReducer);

