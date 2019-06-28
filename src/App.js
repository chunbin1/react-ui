import React, { useRef, useCallback } from "react";

import Carousel from "./components/Carousel/Carousel";
import Tabs from "./components/Tabs";
// import ScssTest from "./components/ScssTest/Scsstest";
import "./App.css";
import useClickOutSide from "./useHook/useHook";

const requireContext = require.context("./asserts/img", true, /^\.\/.*\.jpg$/);
const img = requireContext.keys().map(requireContext);
const TabPane = Tabs.TabPane;

function App(props) {
  const ref = useRef(null);
  const ousideHandler = useCallback(() => {
    console.log("点击了外部");
  }, []);
  useClickOutSide(ref, ousideHandler);
  return (
    <div>
      <p>无限轮播</p>
      <Carousel width={450} height={300}>
        {img.map((val, idx) => (
          <img
            style={{ display: "inline-block" }}
            src={val}
            key={val}
            alt={`图${idx}`}
          />
        ))}
      </Carousel>
      <p>Tabs</p>
      <Tabs>
        <TabPane tab="Tab 1" key="123">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <p>点击外部触发</p>
      <div
        ref={ref}
        style={{
          height: 200,
          width: 200,
          backgroundColor: "green"
        }}
      >
        点击外部 触发
      </div>
    </div>
  );
}

export default App;
