import { ELEMENT_TEXT, TAG_HOST, TAG_ROOT, PLACEMENT, TAG_TEXT } from "../react/constants";
import { setProps} from './utils';

let nextUnitOfWork = null;

//  1: 先给nextUInitOfWork赋值，workLoop开始工作
function scheduleRoot(rootFiber) {
    nextUnitOfWork = rootFiber;
}   

function workLoop(IdleDeadline) {
    let shouldYeild = false;
    while(nextUnitOfWork && !IdleDeadline.didTimeout) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYeild = IdleDeadline.timeRemaining() < 1;
    }
    if(nextUnitOfWork) {
        requestIdleCallback(workLoop, { timeout: 500})
    } else {
        console.log('render阶段结束')
    }
}

// performUnitOfWork要调用开始工作的函数
// 如果有儿子：直接返回，，没有儿子，自己就完成了，没有儿子，当前节点要变为上一个
// 变成上一个之后继续判断有没有兄弟节点，如果有直接返回，没有继续返回上一个节点

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);
    if(currentFiber.child) {
        return currentFiber.child;
    }
    while(currentFiber) {
         complateUnitOfWork(currentFiber);
         if(currentFiber.sibling) { 
             return currentFiber.sibling;
         } 
         currentFiber = currentFiber.return;
    }
}

// 收集副作用将副作用变成链表
function complateUnitOfWork(currentFiber) {
    // 每个fiber都有2个属性：firestEffect，指向第一个有副作用的子fiber，lastEffect指向最后一个有副作用的子fiber，中间的用nextEffect做成一个单链表
    let returnFiber = currentFiber.return;
    if(returnFiber) {
        if(!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if(returnFiber.lastEffect) {
            if(returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect =  currentFiber.firstEffect;
            } else {
                returnFiber.lastEffect = currentFiber.lastEffect;
            }
        }
        const effectTag = currentFiber.effectTag;
        if(effectTag) {
            if(returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
                returnFiber.lastEffect = currentFiber;
            }
        }
    }
}

// 判断当前节点的类型，如果是根节点，调用updateHostRoot
function beginWork(currentFiber) {
    if(currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    } else if(currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    } else  if(currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    }
}

// 这个函数要去协调子节点
function updateHostRoot(currentFiber) {
    // 先处理自己，如果是原生节点，创建真实dom，2：创建子fiber
    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
    if(!currentFiber.stateNode) {
        currentFiber.stateNode  = createNode(currentFiber);
    }
}

function updateHost(currentFiber) {
    if(!currentFiber.stateNode) {
        currentFiber.stateNode = createNode(currentFiber);
    }
    const newChildren  = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

// 如果是文本节点就创建文本节点，如果是原生节点就创建原生节点
function createNode(currentFiber) {
    if(currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    } else if(currentFiber.tag === TAG_HOST) {
        return document.createElement(currentFiber.type);
    }
}

function updateDom(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}

// 协调过程：while循环遍历，每遍历一次就生成一个fiber，fiber的tag要根据每个节点的type判断
function reconcileChildren(currentFiber, newChildren)  {
    let newChildIndex = 0;
    let prevSibling;
    while(newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag;
        if(newChild.type  === ELEMENT_TEXT) { // 文本节点
            tag  = TAG_TEXT;
        } else if(typeof newChild.type === 'string') { // 原生节点
            tag = TAG_HOST;
        }
        let newFiber  =  {
            tag,
            type: newChild.type,
            props: newChild.props,
            stateNode: null,
            return: currentFiber,
            effectTag: PLACEMENT,
            nextEffect: null,
        }
        if(rootFiber) {
            if(newChildIndex == 0) { 
                currentFiber.child = newFiber;
            } else {
                prevSibling.sibling = newFiber;
            }
        } 
        newChildIndex++;
    }
}
requestIdleCallback(workLoop, { timeout: 500 })
export default  scheduleRoot;