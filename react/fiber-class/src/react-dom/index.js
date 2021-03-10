let  isFirstRender =  false;
let HostRoot  = 'HostRoot'; // 标识RootFiber类型
let ClassComponent = 'ClassComponent'; // 类组件
let HostComponent = 'HostComponent'; // 原生dom类型
let HostText  =  'HostText'; // 文本类型
let FunctionComponent = 'FunctionComponent';

let NoWork = 'NoWork';
let Placement = 'Placement';
let Update = 'Update';
let Deletion = 'Deletion';
let PlaceAndUpdate = 'PlaceAndUpdate';

class FiberNode {
    constructor(tag, key, pendingProps) {
        this.tag = tag;
        this.key = key;
        this.type = null;
        this.stateNode = null;
        this.child = null;
        this.return = null;
        this.sibling =  null;
        this.index = 0;
        this.memoizedState = null;
        this.memolizedProps = null;
        this.pendingProps = pendingProps;
        this.effectTag  = null;
        this.firestEffect = null;
        this.lastEffect = null;
        this.nextEffect = null;
        this.alternate = null; // current和workInProgress之间的链接
        this.updateQueue = null; // 挂载当前fiber的新的状态，setState({n:1}) ,setState({n:3}),挂了1和3
    }   
}
function createFiber() {
    return new FiberNode();
}

class ReactRoot {
    constructor(container) {
        this._internalRoot = this._createRoot(container);
    }
    _createRoot(container) {
        let unInitialFiber = this._createUnInitialFiber()
        let root =  {
            container,
            current: null,
            finishedWork:  null
        }
        return  root;
    }
}
const ReactDom = {
    render(reactElement, container, callback) {
        isFirstRender  = true;
        let root = new  ReactRoot(container);
    }
}