import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from './store/actions';

class Counter extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number ? this.props.number : 0}</p>
                <button onClick={this.props.add}>+</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(
    mapStateToProps,
    actions
)(Counter);