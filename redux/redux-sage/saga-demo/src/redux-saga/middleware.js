import { stdChannel } from './channel';
import {runSaga } from './runSaga';
function sagaMiddlewareFactory() {
    const channel = stdChannel();
    let boundSaga;
    function sagaMiddleware({getState, dispatch}) {
        boundSaga = runSaga.bind(null, {
            channel,dispatch, getState
        })
        return function(next) {
            return function(action) {
                let result = next(action); // 以后调用dispatch，除了老的还要调用put
                channel.put(action);
                return result;
            }
        }
    }
    sagaMiddleware.run= (rootSaga) => {
        boundSaga(rootSaga);
    }
    return sagaMiddleware;
}

export default sagaMiddlewareFactory;

// store.dispatch()
// return function(action) {
//      return store.dispatch(action);
// }