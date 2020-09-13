import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
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
      console.log("Interviewer", interviewer)
      return;
    } else if (interviewer === null) {
      setError("One interviewer has to be selected");
      return;
    }
    setError("");
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
              controlled component
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
          <Button onClick={(event) => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}