// 现代浏览器支持4种不同类型观察者
// Intersection Observer交叉观察者，观察一个元素是否在视窗中可见（用途：无限滚动，图片懒加载，兴趣埋点，控制动画/视图执行），要计算dom位置，依赖于dom查询，这些查询同步导致昂贵开销
//  Mutation Observer 变动观察者 观察dom中的变化，
// Resize 视图观察者 观察视口大小变化，更智能的想要布局，取代@media
// Performance性能观察者 检测性能度量事件

// Intersection异步查询元素相对于其他元素或全局视口的位置
// 创建观察者，定义回调，定义要观察的目标对象

// unobserve取消单个， disconnect取消所有

//  intersectionObserver上面的方法：observe(), disconnect() takeRecords()
const options = {
    root: document.querySelector('.scrollContainer'), // 指定根元素
    rootMargin: '0px', // 指定根边距
    threshold: [0.3, 0.5, 0.8, 1] // 阖值，目标在指定root内可见30%时候调用处理的回调
}

const observer = new IntersectionObserver(handler, options);

function handler(entries, observer) {
    entries.forEach(entry => {

    })
}

// 定义要观察的目标对象

const target = document.querySelector('.targetBox');
observer.observe(target) // 调用Observer的observe方法去观察被观察者
// observer.disconnect() 取消观察


//  比如有一系列使用了懒加载的图片。<img src="load.png" data-src="img.png"
const observerImg = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        entry.target.src=entries.target.dataset.src; // 将真实路径赋值给src， 之后取消监听
        observer.unobserve(entry.target);
    })
}, {rootMargin: '0px 0px -200px 0px'});

// 例子
const boxList = [...document.querySelectorAll('.box')];
const io = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        if(item.intersectionRatio === 1) { // 如果该元素完全暴露出来
            // ...执行埋点曝光代码，上报
            import.unobserve(item.target)
        }
    })
}, {root: null, threshold: 1})

boxList.forEach(box => io.observe(box)) // 这里订阅，等符合条件，执行完代码后取消订阅

// IntersectionObser判断用户是否喜欢：位于屏幕中间，切停留时长大于2秒计数一次，区域悬停，触发定时器记录时间，

// 控制动画/视频执行，  ----------想一下： 视频到了可视区自动播放，离开可视区停止播放？？？？？？

// 可以用这个办法：1： 获取到所有的视频资源，实例化一个IntersectionObserver对象IO（会传一个根对象）遍历资源对象，每个对象都调用IO的observe方法，设置监听，如果视频进入根对象区域内就播放该视频


// MutationObserver 变动观察者
// 监视对dom树做的更改，MutationEvents原理：通过绑定事件监听dom。优势：MutationEvent是同步触发，dom的变动会立刻触发相应的事件，MutationObserver是异步的，dom的变动不会马上触发，而是等待所有dom操作触发完
// MutationObserver监听文本变化：聊天的旗袍框菜单，检测文本中的指定字符串/表情包，触发类似微信聊天的表情落下动画


// resizeObserver视图观察者，新js API，和IntersectionObserver类似，都允许监听某个元素的变化
// 为了监听div变化都将侦听器附加到window的resize事件中，这很容易导致性能问题，window.resize很浪费，因为他告诉我们每个视窗变化而不仅仅是一个元素的大小变化
// resize事件会在1秒内触发60次，容易导致性能问题
// resizeObserver细化粒度的dom元素观察而不是window，没有额外开销，只会在绘制前或布局后触发调用


// performanceObserver，nodejs和浏览器大都存在的。 window.performance和window.perfomanceObserver
