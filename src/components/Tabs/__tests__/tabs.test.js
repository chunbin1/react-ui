import React from "react";
import Enzyme, { render, mount } from "enzyme";
import Tabs from "../index.js";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
const TabPane = Tabs.TabPane;

function renderTabs() {
  return (
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
  );
}

describe("tabs test", () => {
  it("base use", () => {
    const wrapper = render(
      renderTabs()
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("tabs nums", () => {
    const wrapper = mount(
      renderTabs()
    )
    expect(wrapper.find('.tab-item')).toHaveLength(3)
  });

  it("click tabs", () => {
    const wrapper = mount(
      renderTabs()
    )
    const firstTab = wrapper.find('.tab-item').first()
    expect(firstTab.hasClass('tab-selected'))
    const lastTab = wrapper.find('.tab-item').last()
    lastTab.simulate('click');
    expect(lastTab.hasClass('tab-selected'))
  });
});
