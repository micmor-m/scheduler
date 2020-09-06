import React, { useReducer, Fragment, useEffect, useState } from "react";
//import DayList from "../components/Application/DayList";
import "components/Application.scss";
//import Appointment from "../components/Appointment/index";
//import getAppointmentsForDay from "../helpers/selectors";
//import { getInterview, getInterviewersForDay } from "../helpers/selectors";
const axios = require('axios').default;

/////////////REDUCER
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { /* insert logic */ 
        //setState({ ...state, day });
       ...state, day: action.day

      }
    case SET_APPLICATION_DATA:
      return { /* insert logic */ 
        //setState =((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
        ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
      }
    case SET_INTERVIEW: 
      {   /* insert logic */
      let appointment = {}
      //if interview is not null append the new interview to the object appointment
      if (action.interview) {
        appointment = {...state.appointments[action.id], interview: { ...action.interview }}
      } else {
        //if the interview is null set the interview of the appointment as action.interview which is null
        appointment = {...state.appointments[action.id], interview: action.interview }
      }
      const appointments = {...state.appointments, [action.id]: appointment}

      //update remaining spots
      //1- I want update the state of days.spots
      //2- days is an ARRAY of OBJECT
      //2- I need to check the id of the appointment changed to see in which day update it
      const array = [...state.days]
      //console.log("array from update spots", array)
      // debugger
      const newArray = array.map(function (item) {
        //if interview preset subtract spots
        if (action.interview) {
          if (item.appointments.includes(action.id)) {
            return {...item, ...item.spots = item.spots - 1}
          } else {
            return item
          }
        } else {
          if (item.appointments.includes(action.id)) {
            return {...item, ...item.spots = item.spots + 1}
          } else {
            return item
          }
        }
        
       })
      
      //console.log("NEW array from update spots", newArray)
      
      return { ...state,  appointments, days: newArray}
        
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


//////////// USE APPLICATION DATA
export default function useApplicationData(props) {

  
// const [state, setState] = useState({
// day: "Monday",
// days: [],
// appointments: {},
// interviewers: {}
// });

const [state, dispatch] = useReducer(reducer,{
day: "Monday",
days: [],
appointments: {},
interviewers: {}
});

// 1 from Application.js
//const setDay = day => setState({ ...state, day });
const setDay = day => dispatch({ type: SET_DAY, day });


// 2 from Application.js
//get data from the server
useEffect(() => {
const days =axios.get("/api/days")
const appointments =axios.get("/api/appointments")
const interviewers =axios.get("/api/interviewers")
Promise.all([
Promise.resolve(days),
Promise.resolve(appointments),
Promise.resolve(interviewers)
]).then((all) => {
//setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
// dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
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
const res = axios.put(`api/appointments/${id}`, {interview: {...interview}})

//it inside the save function in the form component
return Promise.resolve(res)
.then((res) => {
console.log("res data:", res)
//set the local state with new value only after the data in the server have been saved
//because the server only hold the true data
//setState({...state, appointments });
dispatch({ type: SET_INTERVIEW, id, interview });
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

const res = axios.delete(`/api/appointments/${id}`)
//I have to return the promise to use
//it inside the onDelete function in the form component
return Promise.resolve(res)
.then((res) => {
// console.log("res data from Cancel interview:", res)
//setState({...state, appointments});
dispatch({ type: SET_INTERVIEW, id, interview: null });
})
}

return {state, setDay, bookInterview, cancelInterview}

}