import React, { useEffect } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY)
    }
  }, [props.interview, transition, mode])


  //to pass interview id and interviewer to application
  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    //all time while saving data to server shows "SAVING"
    transition(SAVING)
    //only when the promise from the server is done I show the booking
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE, true));
  }


  function onDelete() {
    transition(DELETING, true)

    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(error => { transition(ERROR_DELETE, true) })


  }

  return (

    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (<Form
        name=""
        interviewers={props.interviewers}
        interviewer={null}
        onSave={save}
        onCancel={back}
      />)}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm onConfirm={onDelete} onCancel={back} message={"Are you sure you would like to delete?"} />}
      {mode === EDIT && (<Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
      />)}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={back} />}
    </article>
  );
}