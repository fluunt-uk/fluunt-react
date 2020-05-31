import { AnyAction } from "redux";
import { SET_STATUS, SET_DEFAULT } from ".";

const initialState : object = {LoginPageState:false}

export default function ComponentReducer(state = initialState, action:AnyAction):object{
    const payload = action.payload
    switch (action.type){
        case SET_STATUS:
            return Object.assign({}, state, payload);
        case SET_DEFAULT:
        default:
            return state
  
    }   
}


