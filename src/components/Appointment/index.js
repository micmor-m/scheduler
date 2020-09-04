import React from 'react'
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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (

<article className="appointment">
    <Header time={props.time} /> 
    {mode === EMPTY && <Empty onAdd={transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (<Form
                    name="Lydia Miller-Jones"
                    interviewers={[]}
                    interviewer={4}
                    onSave={transition()}
                    onCancel={transition()}
                    />)}
</article>
  );
}

// onSave={action("onSave")}
// onCancel={action("onCancel")}