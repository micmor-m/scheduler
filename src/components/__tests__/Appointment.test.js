import React from "react";

import { render, cleanup, prettyDOM } from "@testing-library/react";

import Appointment from "components/Application";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it('should have be className "todo-item"', () => {
    // Container has alot of methods that gives us ways to traverse the Item DOM
    const { container } = render(<Appointment time={'12pm'} />)
    //console.log("Container", prettyDOM({container}))
    // our item should have a className todo-item which we can get out firstChild
    //expect(container.firstChild.className).toBe('todo-item')
  })
});
