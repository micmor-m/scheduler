import React, { useState, Fragment, useEffect } from "react";
//import DayList from "../components/Application/DayList";
import "components/Application.scss";
//import Appointment from "../components/Appointment/index";
//import getAppointmentsForDay from "../helpers/selectors";
//import { getInterview, getInterviewersForDay } from "../helpers/selectors";
const axios = require('axios').default;

export default function useApplicationData(props) {

 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

// 1 from Application.js
const setDay = day => setState({ ...state, day });

// 2 from Application.js
//get data from the server
useEffect(() => {
  const promise1 =axios.get("http://localhost:8001/api/days")
  const promise2 =axios.get("http://localhost:8001/api/appointments")
  const promise3 =axios.get("http://localhost:8001/api/interviewers")
  
  Promise.all([
    Promise.resolve(promise1),
    Promise.resolve(promise2),
    Promise.resolve(promise3)
  ]).then((all) => {
    setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  })    
    //.then(response => setDays(response.data));
  }, []);

  // 3 from Application.js
//to save a new interview booking in the database
function bookInterview(id, interview) {
    
  //create new appointment 
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  //to update in appoiments the appointment with same id
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  //update the server state
  const res = axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: {...interview}})

  //it inside the save function in the form component
  return Promise.resolve(res)
  .then((res) => {
    console.log("res data:", res)
    //set the local state with new value only after the data in the server have been saved
    //because the server only hold the true data
    setState({
      ...state,
      appointments
    });
    
  })
}

// 4 from Application.js
function cancelInterview(id) {
  //update the server state
const appointment = {
  ...state.appointments[id],
  interview: null
  };
//to update in appoiments the appointment with same id
const appointments = {
  ...state.appointments,
  [id]: appointment
};

const res =  axios.delete(`http://localhost:8001/api/appointments/${id}`)
//I have to return the promise to use
//it inside the onDelete function in the form component
return Promise.resolve(res)
  .then((res) => {
 // console.log("res data from Cancel interview:", res)
  setState({
    ...state,
    appointments
  });

})
}

return {state, setDay, bookInterview, cancelInterview}

}