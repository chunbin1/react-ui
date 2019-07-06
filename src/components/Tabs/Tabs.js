import React, { Component } from 'react'
import className from 'classnames'
import './Tabs.scss'

const headerStyle = {
  width:'100px',
  height:'20px',
  border:'1px solid black',
  display:'inline-block',
}

export default class Tabs extends Component {
  constructor(props){
    super(props)
    this.state={
      index:this.props.defaultKey||0,
    }
    this.renderTabs = this.renderTabs.bind(this)
    this.clickTabs = this.clickTabs.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  renderTabs(){
    const {children} = this.props
    return React.Children.map(children,(child,index) => {
      const childClone = React.cloneElement(child)
      return (
        <div className={className('tab-item',{'tab-selected':this.state.index===index,})} key={index} index={index} onClick={this.clickTabs} style={headerStyle}>
          {childClone.props.tab}
        </div>
      )
    }
    )
  }

  clickTabs(e){
    const index = Number(e.target.getAttribute('index'))
    this.setState({index,})
  }

  renderContent(){
    const {children} = this.props
    return React.Children.map(children,(child,index)=>{
      const childClone = React.cloneElement(child)
      const {children} = childClone.props
      return <div style={{display:this.state.index===index?'block':'none',width:"100%"}} >{children}</div>
    })
  } 

  render() {
    return (
      <div style={{position:"relative"}}>
        <div className='tabs-header'>
          {this.renderTabs()}
        </div>
        <div className='tabs-content'>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function TabPane(props) { 
  return <div {...props}></div>
}

Tabs.TabPane  = TabPane