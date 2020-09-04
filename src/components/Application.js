import React, { useState, Fragment, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from "../helpers/selectors";
import { getInterview, getInterviewersForDay } from "../helpers/selectors";
const axios = require('axios').default;


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);


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
      //setState(prev => ({ days: all[0].data, appointments: all[1].data }));
    })    
      //.then(response => setDays(response.data));
    }, []);

  //console.log("state of appontment", state.appointments)

  //filter from the state only the interviewer of the day
  const interviewers = getInterviewersForDay(state, state.day)
    console.log("Interviewers of the day:", interviewers)

  //filter from the state only the appointment of the day
  const appointments = getAppointmentsForDay(state, state.day)

  

  //console.log("appointments", appointments)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={ state.days }
            day= { state.day }
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* {appointments.map((appointment) => {
          return (
            <Fragment>
            <Appointment key={appointment.id} {...appointment} />
            
            </Fragment>
          );
        })} */}
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);

          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
            />
            );
        })}
        <Appointment id="last" time="5pm" />  
      </section>
    </main>
  );
}
