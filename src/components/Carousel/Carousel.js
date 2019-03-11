import React, { Component } from 'react'
import './Carousel.scss'

export default class Carousel extends Component {
  render() {
    return (
      <div  className='carousel'>
        <div className='content'>
        {this.props.children}
        </div>
        <button className='left'>{'<'}</button>
        <button className='right'>{'>'}</button>       
      </div>
    )
  }
}
