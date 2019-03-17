import React, { Component } from "react";
import "./Carousel.scss";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
      offset: -this.props.width,
    };
    const {width,height,children} = this.props
    this.length = children.length+2
    this.contentStyle = {
      width: width,
      height: height,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      position: 'relative'
    };
    this.renderChildren = this.renderChildren.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.rightHandler = this.rightHandler.bind(this);
    this.leftHandler = this.leftHandler.bind(this);
  }
  rightHandler(e) {
    const { currentIndex } = this.state;
    this.setIndex(currentIndex + 1);
  }
  leftHandler() {
    const { currentIndex } = this.state;
    this.setIndex(currentIndex - 1);
  }
  setIndex(index) {
    const len = this.props.children.length;
    let nextIndex = Math.min(len+1,index);
    const { width } = this.props;
    const delay = this.props.delay||100
    this.setState({ currentIndex: nextIndex });

    const currentOffset = this.state.offset;
    const nextOffset = -nextIndex * width;

    let start = null;

    const move = timestamp => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      this.setState({
        offset: currentOffset + (nextOffset - currentOffset) * progress / delay
      });

      if (progress < delay) {
        requestAnimationFrame(move);
      } else {
        if (nextIndex === 0) {
          nextIndex = len;
        } else if (nextIndex >= len + 1) {
          nextIndex = 1;
        }
        this.setState({ currentIndex: nextIndex, offset: -nextIndex * width });
      }
    };
    requestAnimationFrame(move);
  }
  renderChildren() {
    const { children, width, height } = this.props;
    const childStyle = {
      width: width,
      height: height
    };
    const appendedChildren =[
      children[children.length-1],
      ...children,
      children[0]
    ]
    return React.Children.map(appendedChildren, (child,index) => {
      const childClone = React.cloneElement(child, { style: childStyle });
      return (
        <div
          style={{
            display: "inline-block"
          }}
          key={index}
        >
          {childClone}
        </div>
      );
    });
  }


  render() {
    const { offset } = this.state;
    const imageRowStyle = {
      marginLeft: offset
    };
    return (
      <div className="carousel">      
        <div className="content" style={this.contentStyle}>
        {}
        <button className='left' onClick={this.leftHandler}>
          {"<"}
        </button>
        <button className='right' onClick={this.rightHandler}>
          {">"}
        </button>
          <div style={imageRowStyle}> {this.renderChildren()}</div>
        </div>     
      </div>
    );
  }
}
