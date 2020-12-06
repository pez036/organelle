/*
*Name:monthandyear.js
*Function: month and year component for display
*Author: Michael
*/
import React, { useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../calendar/cssFiles/monthandyear.css';
//import Popover from 'react-bootstrap/Popover';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

//import moment from 'moment';
//import days from '../calendar/days';


export default function MonthandYear(props) {

/*needs to be fixed - might take up a lot of data*/
const [myValue] = useState(props.value);

function currMonthName(){
  return myValue.format("MMMM");
}

function currYear(){
  return myValue.format("YYYY");
}

function prevMonth(){
  return props.prevMonth();
}

function nextMonth(){
  return props.nextMonth();
}


return (

    <div>
      <Container>
      <Row>
      <Col xl={2}>
        <ButtonToolbar>
        <Button variant="dark" size="lg" onClick={()=>prevMonth()}>Previous</Button>
        <Button variant="dark" size="lg" onClick={()=>nextMonth()}>Next</Button>
        </ButtonToolbar>
      </Col>
        <Col xl={5}>
        <h1 class="text-dark" align ="center">
        <div>
        {currMonthName()} </div>
        <div>   </div>
        <div> {currYear()}</div>
        </h1>
        </Col>
        <Col xl={5}>
          <ButtonToolbar>
          <Button variant="dark" size="lg">Export Calendar File</Button>
          <Button variant="dark" size="lg">Import Calendar File</Button>
          </ButtonToolbar>
        </Col>
      </Row>
      </Container>
    </div>
);


}
