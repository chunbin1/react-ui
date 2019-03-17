import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Scsstest.scss'
export default class Scsstest extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className='main'>
        <div className='header'>
          <button className='left'>{'<'}</button>
        </div>      
      </div>
    )
  }
}

