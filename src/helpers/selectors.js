//return an array of appointments for a given day
export default function getAppointmentsForDay(state, day) {

  let filteredDay = [];
  let filteredDayArray = [];
  let filteredAppointment = [];

  if (state.days.length > 0) {
    filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length > 0) {
      filteredDayArray = filteredDay[0].appointments;

      for (let each of filteredDayArray) {
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

    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
}

//return an array of Interviewer for a given day 
export function getInterviewersForDay(state, day) {

  let filteredDay = [];
  let filteredDayArray = [];
  let filteredInterviewers = [];

  if (state.days.length > 0) {
    filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length > 0) {
      filteredDayArray = filteredDay[0].interviewers;
      for (let each of filteredDayArray) {
        filteredInterviewers.push(state.interviewers[each])
      };
    }
  }
  return filteredInterviewers;
}