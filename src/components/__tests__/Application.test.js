import React from "react";

import { render, cleanup, waitForElement, fireEvent, act, prettyDOM, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import Form from "components/Appointment/Form";

//import  from "components/__tests__/axios";

afterEach(cleanup);

describe("Application", () => {

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    //waitForElement function returns a promise
    return waitForElement(() => getByText("Monday")).then(() => {
      //when promise resolve we fire event to simulate user click Tuesday
      fireEvent.click(getByText("Tuesday"));
      expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
    }); 
  })

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);
    console.log(prettyDOM(container));
    //await waitForElement(() => getByText(container, "Archie Cohen"));
  
    
  });

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1 copy", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));
    console.log(prettyDOM(container));
  });

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1 copy2", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments));
    //console.log(prettyDOM(container));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //console.log(prettyDOM(appointment));
    //console.log(prettyDOM(container));
    //1)simulate the user click onadd
    fireEvent.click(getByAltText(appointment, "Add"));
    //2)simulate to show the empty form
    //const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    //3)simulate to write a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //4)simulate to select an interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //5)simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    //console.log("This is from line 80", prettyDOM(appointment));
    const { container1, debug } = render(<Application />);
    //console.log("This is from debug", prettyDOM(debug()));
    //console.log("*************DEBUG***************")
    //debug()
    //expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //console.log("*************DEBUG***************")
    //debug()
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    //console.log("Day", prettyDOM(day));
    //expect(day(/student name cannot be blank/i)).toBeInTheDocument();
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


});
