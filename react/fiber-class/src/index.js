import React, { Component } from 'react'
import ReactDom from '../../fiber/src/react-dom'

export default class Ding extends Component {
    handleClick = () => {

    }
    render() {
        return (
            <div onClick={this.handleClick}>
                <h1 color="#000">abc</h1>
                <h2>你好</h2>
            </div>
        )
    }
}

ReactDom.render(<Ding prop1={333} key="122"></Ding>, document.getElementById('root'))

