import React from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";
import expressAsyncAwait from "express-async-await";

// this module is totest whether the app renders without crashing
// makig sure there is some kind of output
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("creates a snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
