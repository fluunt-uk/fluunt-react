import 
{
    GlobalComponentValues, 
    ActionTypes
} from '..'

export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";
export const MODIFY_CUSTOMER = "MODIFY_CUSTOMER";


export function AddCustomer(payload:GlobalComponentValues): ActionTypes {
    return { type: ADD_CUSTOMER, payload }
};
export function RemoveCustomer(payload:GlobalComponentValues): ActionTypes {
    return { type: REMOVE_CUSTOMER, payload }
};
export function ModifyCustomer(payload:GlobalComponentValues): ActionTypes {
    return { type: MODIFY_CUSTOMER, payload }
};


