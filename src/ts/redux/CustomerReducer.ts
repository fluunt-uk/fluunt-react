import { AnyAction } from "redux";
import 
{
    CustomerType,
    ADD_CUSTOMER, 
    REMOVE_CUSTOMER,
    MODIFY_CUSTOMER 
} from "..";

const initialState:Array<CustomerType> =  []

export function CustomerReducer(state = initialState, action:AnyAction):Array<CustomerType>{
    switch (action.type){
        case ADD_CUSTOMER:
            case REMOVE_CUSTOMER:
            case MODIFY_CUSTOMER:
            default: 
                return state
            
    }
}

