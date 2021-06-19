import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/react">
      <Link to="/">首页</Link>
      <Route path="/" exact render={()=> (
        <div>我是react</div>
      )}></Route>
    </BrowserRouter>
  );
}

export default App;
