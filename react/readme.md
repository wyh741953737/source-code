const [count, setCount] = useState(0);

function handleClick () {
    setTimeout(()=>{
        alert('You clicked' + count)
    }, 3000)
}

return <div>
    <button onClick={()=>setCount(count+1)}>Click me</button>
    <button onClick={handleClick}>Alert</button>
</div>

你点击Clickme按钮：count是实时的，但是点击Alert不是
当我们更新state时，react会重新渲染组件，每次渲染都会拿到独立的count状态，并重新渲染一个handleClick函数，每个handleClick都有自己的count
