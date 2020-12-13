/*
*Name:monthandyear.js
*Function: month and year component for display
*Author: Michael
*/
import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../calendar/cssFiles/monthandyear.css';
//import Popover from 'react-bootstrap/Popover';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

//import moment from 'moment';
//import days from '../calendar/days';

import Axios from 'axios';

import CalendarImportModal from '../misc/CalendarImportModal';

export default function MonthandYear(props) {

  /*needs to be fixed - might take up a lot of data*/
  const [myValue] = useState(props.value);

  function currMonthName() {
    return myValue.format("MMMM");
  }

  function currYear() {
    return myValue.format("YYYY");
  }

  function prevMonth() {
    return props.prevMonth();
  }

  function nextMonth() {
    return props.nextMonth();
  }

  const [modalToggle, setModalToggle] = useState(false);
  const importModalHandler = () => {
    modalToggle ? setModalToggle(false) : setModalToggle(true);
  }

  const exportIcs = async (e) => {

    const eventURL = process.env.NODE_ENV === "production" ?
      "http://organelle.pzny.xyz/calendar/get" :
      "http://localhost:8080/calendar/get";
    let token = localStorage.getItem("auth-token");
    let res = await Axios.get(eventURL, { headers: { "x-auth-token": token } });

    const a = document.createElement('a');
    const file = new Blob([res.data], {type: res.headers["content-type"]});
    
    a.href= URL.createObjectURL(file);
    a.download = "organelle.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  }



  return (

    <div>
      <CalendarImportModal action={importModalHandler} show={modalToggle} />
      <Container>
        <Row>
          <Col xl={1}>
            <ButtonToolbar>
              <Button variant="dark" size="lg" onClick={() => prevMonth()}>Previous</Button>
            </ButtonToolbar>
          </Col>
          <Col xl={7}>
            <h1 class="text-dark" align="center">
              <div>
                {currMonthName()}   {currYear()}</div>
            </h1>
          </Col>
          <Col xl={4}>
            <ButtonToolbar>
              <Button variant="dark" size="lg" onClick={() => nextMonth()}>Next</Button>
              <Button variant="dark" size="lg" onClick={exportIcs}>Export Calendar File</Button>
              <Button variant="dark" size="lg" onClick={() => importModalHandler()}>Import Calendar File</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    </div>
  );


}
