import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';

let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer); // 科里化实现了增强

sagaMiddleware.run(rootSaga);

export default store;