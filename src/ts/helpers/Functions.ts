import { bindActionCreators } from 'redux';
import { StateTypes, SetStatus, SetDefault, store} from '..';


export function mapObject(object:any, callback:any) {
    return Object.keys(object === undefined ? {} : object).map(function (key){
      return callback(key, object[key]);
    });
}
  
// action i.e modifyCUSTOMER
export function mapDispatchToProps(dispatch: any ) {
    return {  
      Default: bindActionCreators(SetDefault, dispatch),
      Status: bindActionCreators(SetStatus, dispatch)
    }
}

export function mapStateToProps(state:StateTypes){  
  return {
    Components: state.Components,
    Customers: state.Customers
  };
}



//Debugging Store
declare global 
{ 
    interface Window { store:any, debug:any } 
}

window.debug = 
{
    dbval: false,
    set(val:boolean) { 
        this.dbval = val;
        window.store = (this.dbval) ? store : null;
        return `Store Debugging is ${(this.dbval) ? "Active": "Inactive"}`
    },
}