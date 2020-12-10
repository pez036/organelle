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

import Axios from "axios";
const ics = require('ics')

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
const exportIcs = async(e) => {

  const eventURL = process.env.NODE_ENV === "production"?
  "http://organelle.pzny.xyz/events/all":
  "http://localhost:8080/events/all";
  let token = localStorage.getItem("auth-token");
  let eventRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});

  var arr = [];
  for (var i = 0; i < eventRes.data.length; i++) {
    var event = eventRes.data[i];
    var startDate = new Date(event.startTime);
    var endDate = new Date(event.endTime);
    function f(date)  {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
    }
    var st = f(startDate);
    var ed = f(endDate);
    var evics = {
      title: event.title,
      description: event.description,
      categories: ["organelle"],
      start: st,
      end: ed,
    }
    arr.push(evics);
  }
  console.log(ics.createEvents(arr).value.toString())
  const blob = new Blob([ics.createEvents(arr).value.toString()], {type : 'text/calendar'});
  const element = document.createElement("a");
  element.href = URL.createObjectURL(blob);
  element.download = "organelle.ics";
  document.body.appendChild(element);
  element.click();
}


return (

    <div>
      <Container>
      <Row>
      <Col xl={1}>
        <ButtonToolbar>
        <Button variant="dark" size="lg" onClick={()=>prevMonth()}>Previous</Button>
        </ButtonToolbar>
      </Col>
        <Col xl={7}>
        <h1 class="text-dark" align ="center">
        <div>
        {currMonthName()}   {currYear()}</div>
        </h1>
        </Col>
        <Col xl={4}>
          <ButtonToolbar>
            <Button variant="dark" size="lg" onClick={() => nextMonth()}>Next</Button>
            <Button variant="dark" size="lg" onClick={exportIcs}>Export Calendar File</Button>
          </ButtonToolbar>
        </Col>
      </Row>
      </Container>
    </div>
);


}
