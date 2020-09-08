import React from "react";

import { render, cleanup, waitForElement, fireEvent, act, prettyDOM, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import Form from "components/Appointment/Form";
import axios from "axios";

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
    //console.log(prettyDOM(container));
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
    //1)simulate the user click onadd
    fireEvent.click(getByAltText(appointment, "Add"));
    //3)simulate to write a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //4)simulate to select an interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //5)simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    //console.log("This is from line 80", prettyDOM(appointment));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //console.log("*************DEBUG***************")
    //debug()
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    //console.log("Day", prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //console.log("This is from debug", prettyDOM(appointment));
    // 3. Click the "Delete" button on the first book appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation message.
    
    
    
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    //debug()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 3. Click the "Edit" button on the first book appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //4.simulate to change a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //5.simulate to select another interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6.simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    //console.log("This is from line 80", prettyDOM(appointment));
    //7.confirm the saving message is showing
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //console.log("*************DEBUG***************")
    //debug()
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    //console.log("Day", prettyDOM(day));
    //8.confirm the number of spot is still the same
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug()
  });

});
