import * as actionTypes from './action-type';

const actions = {
    add() {
        return { type: actionTypes.ADD}
    },
    asyncAdd() {
        return {type: actionTypes.ASYNCADD}
    }
}

export default actions;