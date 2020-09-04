import React, { useEffect }from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {

  console.log("appointment props", props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 useEffect(() => {
  if (props.interview && mode === EMPTY){
    transition(SHOW)
  }
  if (props.interview === null && mode === SHOW){
    transition(EMPTY)
  }
 }, [props.interview, transition, mode])


 //to pass interview id and interviewer to application
 function save (name, interviewer){
 // console.log(`name: ${name}, interviewer:${interviewer}`)
  const interview = {
    student: name,
    interviewer
  };
  //all time while saving data to server shows "SAVING"
  transition(SAVING)
  //only when the promise from the server is done I show the booking
  props.bookInterview(props.id, interview)
  .then (() => {transition(SHOW)})
 }

 function edit() {
 }

 function onDelete() {
   console.log("I press onDelete")
   transition(CONFIRM)

  //  if (mode !== DELETING) {
  //    return
  //  } else if (mode === DELETING) {
  //  //transition(DELETING)
  //  }
   props.cancelInterview(props.id)
  .then (() => {transition(EMPTY)})
  //transition(EMPTY)
   
}

  return (

<article className="appointment">
    <Header time={props.time} /> 
    {mode === EMPTY && <Empty onAdd={ () => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onDelete={onDelete}
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
    {mode === CONFIRM && <Confirm onConfirm={ () => transition(DELETING)} onCancel={back} />}
</article>
  );
}

// onSave={action("onSave")}
// onCancel={action("onCancel")}