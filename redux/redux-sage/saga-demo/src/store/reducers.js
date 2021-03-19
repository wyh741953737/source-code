import * as actionTypes from './action-type';

const reducer = (state={number: 0}, action) => {
    switch(action.type) {
        case actionTypes.ADD: {
            return {number: state.number+1}
        }
        default: 
            break;
    }
}

export default reducer;