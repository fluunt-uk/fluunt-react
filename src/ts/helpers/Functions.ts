import { bindActionCreators } from 'redux';
import { StateTypes, SetStatus, SetDefault} from '..';


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