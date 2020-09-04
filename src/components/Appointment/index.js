import React, { useEffect }from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


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

 function save (name, interviewer){
   console.log(`name: ${name}, interviewer:${interviewer}`)
  transition(SHOW)
 }

  return (

<article className="appointment">
    <Header time={props.time} /> 
    {mode === EMPTY && <Empty onAdd={ () => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (<Form
                    name=""
                    interviewers={props.interviewers}
                    interviewer={4}
                    onSave={save}
                    onCancel={back}
                    />)}
</article>
  );
}

// onSave={action("onSave")}
// onCancel={action("onCancel")}