import * as actionTypes from './action-type';
import {take, put, call} from 'redux-saga/effects';

export function * rootSaga() {
    for(let i = 0; i < 3; i++) {
        console.log(`等待${actionTypes.ASYNCADD}动作`)
        const action = yield take(actionTypes.ASYNCADD);
        console.log('等到了')
        console.log(action)
        yield put({type: actionTypes.ADD}); // 等同于store.dispatch({type: ''})
    }
}

// take接收,只等一次
// put发射动作
// call发射请求