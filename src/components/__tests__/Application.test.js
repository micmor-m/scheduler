import React from "react";

import { render, cleanup, waitForElement, fireEvent, act } from "@testing-library/react";

import Application from "components/Application";

//import  from "components/__tests__/axios";

afterEach(cleanup);

describe("Form", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    //waitForElement function returns a promise
    return waitForElement(() => getByText("Monday")).then(() => {
      //when promise resolve we fire event to simulate user click Tuesday
      fireEvent.click(getByText("Tuesday"));
      expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
    }); 
  })

});
