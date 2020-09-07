import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  // let interviewer = ""
  // const setInterviewer = (id) => {
  //   console.log("Id from set interviewer:", id)
    
  // }

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //console.log("interviewer", interviewerName)
  // const setName = (e) => {
  //   console.log("e from setName", e)
    
  // }

  //console.log("Form props.interviewers", props.interviewers)

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel("", null)
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(name, interviewer);
  }

  return (

<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
       value={name}
       onChange={event => setName(event.target.value)}
       //this field is required to test the Form
       data-testid="student-name-input"
      />
     
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={(event) => cancel()} danger>Cancel</Button>
      {/* <Button onClick={(event) => props.onSave(name, interviewer)} confirm>Save</Button> */}
      <Button onClick={(event) => validate()} confirm>Save</Button>
    </section>
  </section>
</main>
  );
}