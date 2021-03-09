export function setProps(dom, oldProps, newProps)  {
    // 1：遍历老的节点，如果老的节点有，新的节点没有，就删除
    // 如果老的节点没有，新的节点有，就新增
    // 如果属性名字相同，属性值不同，就替换
    for(let key in oldProps)  {

    }
    for(let  key in  newProps) {
        if(key !== 'children') {
            setProps(dom, key, newProps[key]);
        }
    }
}

function setProps(dom, key, value) {
    if(/^on/.test(key)) {
        dom[key.toLowerCase()] = value;
    } else  if(key === 'style') {
        if(value) {
            for(let styleName  in value) {
                dom.style[styleName] = value[styleName]
            }
        }
    } else  {
        dom.setAttribute(key, value);
    }
}