//return an array of days 
export default function getAppointmentsForDay(state, day) {

  //console.log("State", state)
  let filteredDay = [];
  let filteredDayArray = [];
  let filteredAppointment = [];

  if (state.days.length > 0) {
    filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length > 0) {
      //console.log("filteredDay", filteredDay)
      filteredDayArray = filteredDay[0].appointments;
      //console.log("filteredDayArray", filteredDayArray)
      for (let each of filteredDayArray) {

        //console.log("element", each)
        filteredAppointment.push(state.appointments[each])
      };
    }
  }
  return filteredAppointment;
}

//return a new object containing the interview data when we pass it an
//object that contains the interviewer.
//Otherwise, the function should return null.
export function getInterview(state, interview) {

  if (interview === null) {
    return null
  } else {

    return {student:  interview.student,
            interviewer: state.interviewers[interview.interviewer]}
  }

}


//return an array of days 
export function getAppointmentsForDay(state, day) {

  //console.log("State", state)
  let filteredDay = [];
  let filteredDayArray = [];
  let filteredAppointment = [];

  if (state.days.length > 0) {
    filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length > 0) {
      //console.log("filteredDay", filteredDay)
      filteredDayArray = filteredDay[0].appointments;
      //console.log("filteredDayArray", filteredDayArray)
      for (let each of filteredDayArray) {

        //console.log("element", each)
        filteredAppointment.push(state.appointments[each])
      };
    }
  }
  return filteredAppointment;
}