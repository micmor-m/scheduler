import { useReducer, useEffect } from "react";

import "components/Application.scss";

const axios = require('axios').default;

//REDUCER to set the state of app all in the same place 
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, day: action.day
      }
    case SET_APPLICATION_DATA:
      return {
        ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      {
        let appointment = {}
        //if interview is not null append the new interview to the object appointment
        if (action.interview) {
          appointment = { ...state.appointments[action.id], interview: { ...action.interview } }
        } else {
          //if the interview is null set the interview of the appointment as action.interview which is null
          appointment = { ...state.appointments[action.id], interview: action.interview }
        }
        const appointments = { ...state.appointments, [action.id]: appointment }

        //update remaining spots
        //1- I want update the state of days.spots
        //2- days is an ARRAY of OBJECT
        //2- I need to check the id of the appointment changed to see in which day update it
        const daysArray = state.days.map((day) => {
          for (let appointment of day.appointments) {
            if (action.id === appointment) {
              if (action.interview && !state.appointments[action.id].interview) {
                return { ...day, spots: day.spots - 1 };
              } else if (
                !action.interview && 
                state.appointments[action.id].interview)
              {
                return { ...day, spots: day.spots + 1};
              }
            }
          }
          return day
        })
        return { ...state, appointments, days: daysArray }
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(props) {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // 1 from Application.js
  const setDay = day => dispatch({ type: SET_DAY, day });

  // 2 from Application.js
  //get data from the server
  useEffect(() => {
    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    const interviewers = axios.get("/api/interviewers")
    Promise.all([days, appointments, interviewers])
    .then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
  }, []);

  // 3 from Application.js
  //to save a new interview booking in the database
  function bookInterview(id, interview) {
  
    //update the server
    const res = axios.put(`api/appointments/${id}`, { interview: { ...interview } })

    //it inside the save function in the form component
    return Promise.resolve(res)
      .then((res) => {
        //set the local state with new value only after the data in the server have been saved
        //because the server only hold the true data
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
  }

  // 4 from Application.js
  function cancelInterview(id) {
    //update the server
     const res = axios.delete(`/api/appointments/${id}`)
    //I have to return the promise to use
    //it inside the onDelete function in the form component
    return Promise.resolve(res)
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}