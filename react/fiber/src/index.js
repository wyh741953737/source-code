import React from 'react';
import ReactDom from './react-dom';

const element = (
    <div id="A1" style={{border: '1px solid  red'}}>
        <div id="B1" style={{border: '1px solid green'}}>
                <div id="C1" style={{fontSize: '24px'}}>C1</div>
                <div id="C2" style={{fontSize: '24px'}}>C2</div>
        </div>
        <div id="B2">B2</div>
    </div>
)

function Fn(props) {
    return (
        <div id="A1" style={{border: '1px solid  red'}}>
            <div id="B1" style={{border: '1px solid green'}}>
                    <div id="C1" style={{fontSize: '24px'}}>C1</div>
                    <div id="C2" style={{fontSize: '24px'}}>C2</div>
            </div>
            <div id="B2">B2</div>
        </div>
    )
}



ReactDom.render(element,  document.getElementById('root'));
