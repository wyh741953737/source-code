import { TAG_ROOT } from "../react/constants";
import scheduleRoot from  './schedule';

function render(element, container)  {
    let rootFiber  = {
        tag: TAG_ROOT,
        stateNode: container,
        props: {
            children: [element]
        }
    }
    scheduleRoot(rootFiber);
}

const ReactDom = {
    render,
}

export default  ReactDom;