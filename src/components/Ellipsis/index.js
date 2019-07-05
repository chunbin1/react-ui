/* 1. 修复了antd pro 提供的Ellipsis 的bug 
   2. 扩展了功能 
      tooltip={true}的时候如果没超过 长度 不会显示tooltip
      recompute={true}的时候 拖动窗口可以重新计算
 * @Author: Simons 
 * @Date: 2019-06-17 18:24:48 
 * @Last Modified by: Simons
 * @Last Modified time: 2019-06-28 11:47:05
 */
import React, { Component } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import styles from './index.less';

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */
  
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
};

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

const getTooltip = ({ tooltip, overlayStyle, title, children }) => {
  if (tooltip) {
    const props = tooltip === true ? { overlayStyle, title } : { ...tooltip, overlayStyle, title };
    return <Tooltip {...props}>{children}</Tooltip>;
  }
  return children;
};

const EllipsisText = ({ text, length, tooltip, fullWidthRecognition, ...other }) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  const spanAttrs = tooltip ? {} : { ...other };
  return getTooltip({
    tooltip,
    overlayStyle: TooltipOverlayStyle,
    title: text,
    children: (
      <span {...spanAttrs}>
        {displayText}
        {tail}
      </span>
    ),
  });
};

export default class NormalEllipsis extends Component {
  state = {
    text: '',
    targetCount: 0,
    tooltip: false, // 内部的tooltip 只有当文字超过该行 才会显示tooltip
  };

  static defaultProps = {
    recompute: false,
  };

  componentDidMount() {
    const { recompute = false } = this.props;
    if (this.node) {
      this.computeLine();
    }
    if (recompute) {
      window.addEventListener('resize', this.reCompute);
    }
  }

  componentDidUpdate(perProps) {
    const { lines, children } = this.props;
    if (lines !== perProps.lines || children !== perProps.children) {
      this.computeLine();
    }
  }

  componentWillUnmount() {
    const { recompute = false } = this.props;
    if (recompute) {
      window.removeEventListener('resize', this.reCompute);
    }
  }

  /** 重新计算 */
  reCompute = () => {
    this.thro(() => {
      this.computeLine();
    }, 400);
  };

  /** 节流 */
  thro = (func, ms) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(func, ms);
  };

  computeLine = () => {
    const { lines } = this.props;
    if (lines) {
      const text = this.shadowChildren.innerText || this.shadowChildren.textContent;
      const lineHeight = parseInt(getComputedStyle(this.root).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      this.content.style.height = `${targetHeight}px`;
      const totalHeight = this.shadowChildren.offsetHeight;
      const shadowNode = this.shadow.firstChild;
      if (totalHeight <= targetHeight) {
        this.setState({
          tooltip: false,
          text,
          targetCount: text.length,
        });
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        tooltip: true,
        text,
        targetCount: count,
      });
    }
  };

  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = n => {
    this.root = n;
  };

  handleContent = n => {
    this.content = n;
  };

  handleNode = n => {
    this.node = n;
  };

  handleShadow = n => {
    this.shadow = n;
  };

  handleShadowChildren = n => {
    this.shadowChildren = n;
  };

  render() {
    const { text, targetCount, tooltip: _innerToolTip } = this.state;
    console.log(styles);
    const {
      children,
      lines,
      length,
      className,
      tooltip,
      fullWidthRecognition,
      recompute,
      ...restProps
    } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp,
    });

    if (!lines && !length) {
      return (
        <span className={cls} {...restProps}>
          {children}
        </span>
      );
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          {...restProps}
        />
      );
    }
    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div {...restProps} ref={this.handleRoot} className={cls}>
        <div ref={this.handleContent}>
          {getTooltip({
            tooltip: _innerToolTip && tooltip,
            overlayStyle: TooltipOverlayStyle,
            title: text,
            children: childNode,
          })}
          <div className={styles.shadow} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={styles.shadow} ref={this.handleShadow}>
            <div>{text}</div>
            {/* 使用div因为span会超出父盒子高度 */}
          </div>
        </div>
      </div>
    );
  }
}
