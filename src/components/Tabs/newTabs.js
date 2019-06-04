import React, { useState } from "react";
import className from "classnames";
import "./Tabs.scss";

const headerStyle = {
  width: "100px",
  height: "20px",
  border: "1px solid black",
  display: "inline-block"
};

function Tabs(props) {
  let { defaultKey } = props;
  if (defaultKey === undefined) {
    defaultKey = 0;
  }
  const [key, setKey] = useState(defaultKey);

  const is_selected = innerKey => key === innerKey;

  const clickTabs = e => {
    const newKey = Number(e.target.getAttribute("key"));
    setKey(newKey);
  };

  const renderTabs = () => {
    const { children } = props;
    return React.Children.map(children, (child, innerIndex) => {
      const childClone = React.cloneElement(child);
      const { key: innerKey } = childClone;
      return (
        <div
          className={className({ "tab-selected": is_selected(innerKey) })}
          key={key}
          index={innerIndex}
          onClick={clickTabs}
          style={headerStyle}
        >
          {childClone.props.tab}
        </div>
      );
    });
  };

  const renderContent = () => {
    const { noContent = false } = props;
    if (noContent) {
      return null;
    }
    const { children } = props;
    console.log(children);
    return React.Children.map(children, child => {
      const childClone = React.cloneElement(child);
      console.log(childClone)
      const { children: innerChild } = childClone.props;
      const { key:innerKey } = innerChild.props;
      return (
        <div
          style={{
            display: is_selected(innerKey) ? "block" : "none",
            width: "100%"
          }}
        >
          {innerChild}
        </div>
      );
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="tabs-header">{renderTabs()}</div>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  );
}

function TabPane(props) {
  const { children } = props;
  return <div> {children}</div>;
}

Tabs.TabPane = TabPane;

export default Tabs;
