import React from "react";

import { render, cleanup, waitForElement, fireEvent, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

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

 xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //simulate the user click onadd
    fireEvent.click(getByAltText(appointment, "Add"));
    //simulate to write a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //simulate to select an interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //Render the Application.
    const { container } = render(<Application />);
    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //Click the "Delete" button on the first book appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));
    //Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    //Click the "Confirm" button on the confirmation message.
    fireEvent.click(queryByText(appointment, "Confirm"));
    //Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    //Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    //Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //Render the Application.
    const { container, debug } = render(<Application />);
    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //Click the "Edit" button on the first book appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //simulate to change a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //simulate to select another interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    //confirm the saving message is showing
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //Find the specific day node that contains the text "Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    //confirm the number of spot is still the same
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //Render the Application.
    const { container } = render(<Application />);
    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //appointment is an empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //simulate the user click onadd
    fireEvent.click(getByAltText(appointment, "Add"));
    //simulate to write a student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //simulate to select an interviwer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //simulate to save the form  
    fireEvent.click(getByText(appointment, "Save"));
    //simulate to get the saving message
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Could not save appointment"));
    //simulate to close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    //Simulate to be back at the form page
    await waitForElement(() => getByText(container, "Archie Cohen"));
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    //Render the Application.
    const { container } = render(<Application />);
    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //simulate the user click delete
    fireEvent.click(queryByAltText(appointment, "Delete"));
    //Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    //simulate to get the deleting message
    //Click the "Confirm" button on the confirmation message.  
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Could not delete appointment"));
    //simulate to close the error message
    fireEvent.click(getByAltText(appointment, "Close"));
    //Simulate to be back at the form page
    await waitForElement(() => getByText(container, "Archie Cohen"));
  });
});
