# Interview Scheduler

The goal of this project has been to create a modern client application using the React view library.
Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests are used through the development of the project for unit test and Cypress for endToEnd testing.

## Final Product
!["Screenshot of main page"](https://github.com/micmor-m/scheduler/blob/master/docs/main-page.png?raw=true)
!["Screenshot of appointment form"](https://github.com/micmor-m/scheduler/blob/master/docs/appointment-form.png?raw=true)
!["Screenshot of appointment form with input valdation"](https://github.com/micmor-m/scheduler/blob/master/docs/input-validation.png?raw=true)
!["Screenshot of confirmation message"](https://github.com/micmor-m/scheduler/blob/master/docs/confirmation%20message.png?raw=true)
!["Screenshot of error message"](https://github.com/micmor-m/scheduler/blob/master/docs/error-message.png?raw=true)



## Dependencies

- react
- axios
- @testing-library/react-hooks
- react-test-renderer
- babel
- @storybook

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API Server
The application is connected to an API server to persist interview data to a database.
To create and configure it fork and clone the scheduler-api into a new directory (NOT within the scheduler directory) and follow the README.md instructions:
https://github.com/lighthouse-labs/scheduler-api

### Behaviour
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data.

