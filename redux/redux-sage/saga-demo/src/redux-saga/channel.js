function stdChannel() {
    let currentTakers = [];
    // 接收，往里面放，订阅,cb回调函数 matcher匹配器
    function take(cb, matcher) {
        cb['MATCH'] = matcher;
        cb.cancel = () => {
            currentTakers = currentTakers.filter(item => item !== cb);
        }
        currentTakers.push(cb);
    }
    // 让函数执行，发布 
    function put(input) {
        for(let i = 0; i<currentTakers.length;i++) {
            let taker = currentTakers[i];
            if(take['MATCH'](input)) {
                taker.cancel();
                taker(input);
            }
        }
    }
    return { put, take }
}