/**
 * Created by liamvovk on 2017-01-30.
 */

import React, { Component } from 'react'
import randomColor from 'randomcolor'

import AnimatedBox from '../components/animated-box'

import '../pcss/animation.css'

export default class Animation extends Component {
    constructor () {
        super();
        this.state = {
            screenX: 0,
            screenY: 0,
            count: 0,
            width: 80,
            height: 80,
            grow: false
        };
        this.generateBoxes = this.generateBoxes.bind(this);
        this.mouseBox = this.mouseBox.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.rainBox = this.rainBox.bind(this);
    }
    generateBoxes (numBoxes) {
        var color;
        var boxes = [];
        for (var i = 0; i < numBoxes; i++) {
            color = randomColor();
            var backgroundColor = randomColor();
            var border = 'solid 15px ' + color;
            // if (Math.random() > 0.5) {
            //     boxes.push(
            //         <AnimatedBox boxStyle={{
            //             'border': border,
            //             'zIndex': 1,
            //             'left': 0,
            //             'top': 0,
            //             'background': backgroundColor
            //         }} key={i}/>
            //     )
            // } else {
            //     boxes.push(this.mouseBox())
            // }
            boxes.push(this.mouseBox(i))
        }
        return boxes;
    }
    mouseBox (i) {
        var color = randomColor({luminosity: 'dark', hue: 'blue'});
        var backgroundColor = randomColor({luminosity: 'dark', hue: 'blue'});
        var border = 'solid 15px ' + color;
        var width = Math.random() * 150;
        var height = Math.random() * 150;
        var borderRadius = this.state.count;
        return (
            <div
                className="animated-box"
                id='mouse-box'
                key={i}
                style={{
                    'width': this.state.width,
                    'height': this.state.height,
                    'border': border,
                    'background': backgroundColor,
                    'borderRadius': borderRadius
            }}>
            </div>
        )
    }
    onMouseMove (event) {
        var grow = this.state.grow;
        var count = this.state.count;
        var width = this.state.width;
        var height = this.state.height;
        if (count > 75) {
            grow = true;
        } else if (count < 20) {
            grow = false;
        }
        if (grow == true) {
            count -= 1.5;
            height -= 2.5;
            width -= 2.5;
        } else {
            count += 1.5;
            height += 2;
            width += 2;
        }
        var mouseBox = document.getElementById('mouse-box');
        var screenX = 0;
        var screenY = 0;
        this.setState({
            screenX: screenX,
            screenY: screenY,
            count: count,
            grow: grow,
            width: width,
            height: height
        })
    }
    rainBox () {

    }
    componentWillMount () {
        //window.addEventListener('mousemove', this.onMouseMove);
        setInterval(this.onMouseMove, 100);
    }
    componentWillUnmount () {
        //window.removeEventListener('mousemove', this.onMouseMove);
    }
    render () {
        return (
            <div className="animation-container">
                {this.generateBoxes(800)}
                {this.mouseBox()}
            </div>
        )
    }
}