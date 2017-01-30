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
        var color = randomColor({luminosity: 'light', hue: 'blue'});
        var backgroundColor = randomColor({luminosity: 'dark', hue: 'blue'});
        var border = 'solid 15px ' + color;
        var smallBorder = 'solid 4px ' + color;
        var borderRadius = this.state.count;
        return (
            <AnimatedBox
                id='mouse-box'
                key={i}
                boxStyle={{
                'border': border,
                'background': backgroundColor,
                'borderRadius': borderRadius
            }}>
            </AnimatedBox>
        )
    }
    onMouseMove (event) {
        var grow = this.state.grow;
        var count = this.state.count;
        if (count > 75) {
            grow = true;
        } else if (count < 20) {
            grow = false;
        }
        if (grow == true) {
            count -= 1.5;
        } else {
            count += 1.5;
        }
        var mouseBox = document.getElementById('mouse-box');
        var screenX = event.clientX;
        var screenY = event.clientY;
        this.setState({
            screenX: screenX,
            screenY: screenY,
            count: count,
            grow: grow
        })
    }
    rainBox () {

    }
    componentWillMount () {
        window.addEventListener('mousemove', this.onMouseMove);
    }
    componentWillUnmount () {
        window.removeEventListener('mousemove', this.onMouseMove);
    }
    render () {
        return (
            <div className="animation-container">
                {this.generateBoxes(200)}
                {this.mouseBox()}
            </div>
        )
    }
}