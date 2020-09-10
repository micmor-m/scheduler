import React from "react";

import { render, cleanup, waitForElement, fireEvent, act, prettyDOM, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import Form from "components/Appointment/Form";
import axios from "axios";

afterEach(cleanup);


describe("Application", () => {
  //afterEach(cleanup);

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

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
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
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
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
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
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
    //7.confirm the saving message is showing
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //console.log("*************DEBUG***************")
    //debug()
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    //8.confirm the number of spot is still the same
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  /* test number five */
  xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. appointment is an empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // 4. simulate the user click onadd
    fireEvent.click(getByAltText(appointment, "Add"));
    // 5. simulate to write a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 6. simulate to select an interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 7.simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    // 8. simulate to get the saving message
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Could not save appointment"));
    // 11. simulate to close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    // 12. Simulate to be back at the form page
    await waitForElement(() => getByText(container, "Archie Cohen"));
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 4. simulate the user click delete
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 5. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 6. simulate to get the deleting message
    // 7. Click the "Confirm" button on the confirmation message.  
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Could not delete appointment"));
    // 11. simulate to close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    // 12. Simulate to be back at the form page
    await waitForElement(() => getByText(container, "Archie Cohen"));

  });



});
