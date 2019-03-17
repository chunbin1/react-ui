import React, { Component } from "react";

import Carousel from "./components/Carousel/Carousel";
import ScssTest from './components/ScssTest/Scsstest'
import "./App.css";

const requireContext = require.context("./asserts/img", true, /^\.\/.*\.jpg$/);
const img = requireContext.keys().map(requireContext);
class App extends Component {
  render() {
    return (
      <div>
        <p>无限轮播</p>
        <Carousel width={450} height={300} >
          {img.map((val, idx) => (
            <img
              style={{ display: "inline-block" }}
              src={val}
              key={val}
              alt={`图${idx}`}
            />
          ))}
        </Carousel>

        <p>scss的测试</p>
        <ScssTest>
          
        </ScssTest>
      </div>
    );
  }
}

export default App;
