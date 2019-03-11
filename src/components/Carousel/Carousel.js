import React, { Component } from "react";
import "./Carousel.scss";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    const {width,height} = this.props
    this.contentStyle = {
      width: width,
      height: height,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      // position: 'relative'
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.rightHandler = this.rightHandler.bind(this);
    this.leftHandler = this.leftHandler.bind(this);
  }
  rightHandler(e) {
    console.log(e);
    const { currentIndex } = this.state;
    console.log(currentIndex);
    this.setIndex(currentIndex + 1);
  }
  leftHandler() {
    const { currentIndex } = this.state;
    this.setIndex(currentIndex - 1);
  }
  setIndex(index) {
    const len = this.props.children.length;
    const nextIndex = (index + len) % len;
    console.log(nextIndex);
    this.setState({ currentIndex: nextIndex });
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
    const { width, height,delay} = this.props;
    const { currentIndex } = this.state;
    const offset = -currentIndex * width;
    const imageRowStyle = {
      marginLeft: offset,
      transition: delay||"2s"
    };
    return (
      <div className="carousel">
        <div className="content" style={this.contentStyle}>
          <div style={imageRowStyle}> {this.renderChildren()}</div>
        </div>
        <button className="left" onClick={this.leftHandler}>
          {"<"}
        </button>
        <button className="right" onClick={this.rightHandler}>
          {">"}
        </button>
        <div onClick={this.rightHandler}> 哈</div>
      </div>
    );
  }
}
