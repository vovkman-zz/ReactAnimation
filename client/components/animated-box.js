/**
 * Created by liamvovk on 2017-01-30.
 */

import React, { Component } from 'react'

export default class AnimatedBox extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className="animated-box" id={this.props.id} style={this.props.boxStyle}>
                {this.props.children}
            </div>
        )
    }
}