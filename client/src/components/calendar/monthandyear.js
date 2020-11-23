/*
*Name:monthandyear.js
*Function: month and year component for display
*Author: Michael
*/
import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Button, Modal } from 'react-bootstrap';

import '../calendar/cssFiles/monthandyear.css';



import moment from 'moment';
import days from '../calendar/days';


export default function MonthandYear() {

/*needs to be fixed - might take up a lot of data*/
const [myValue, setmyValue] = useState(moment());

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [myShow, setmyShow] = useState(false);
const handlemyClose = () => setmyShow(false);
const handlemyShow = () => setmyShow(true);


const onChangeHandler = (event) => {console.log(event.target.files[0]);}

useEffect(() => {
  days(myValue);
},[myValue])

function currMonthName(){
  return myValue.format("MMMM");
}

function currYear(){
  return myValue.format("YYYY");
}


return (

    <div>



      <Container>
      <Row>
      <Col xl={2}>
        <ButtonToolbar>
        <Button variant="dark" size="lg">Previous</Button>
        <Button variant="dark" size="lg">Next</Button>
        </ButtonToolbar>
      </Col>
        <Col xl={5}>
        <h1 class="text-dark" align ="center">
        <div>
        {currMonthName()}     {currYear()}</div>
        </h1>
        </Col>
        <Col xl={5}>
          <ButtonToolbar>
          <Button variant="dark" size="lg" onClick={handleShow}>Export Calendar File</Button>
          <Button variant="dark" size="lg" onClick={handlemyShow}>
              Import Calendar File
          </Button>
          <div>
            <Modal
                 show={myShow}
                 onHide={handlemyClose}
                 backdrop="static"
                 keyboard={false}
                 animation={false}
                 >

            <Modal.Header closeButton>
                <Modal.Title>
                  Import Calendar
                  </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
              Import your calendar to your documents folder.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlemyClose} size="lg">
                Cancel
              </Button>
              <Button variant="primary" size="md">
                  <input type="file" name ="file" onChange={onChangeHandler}/>
              </Button>
            </Modal.Footer>
          </Modal>

          </div>

          <div>
          <Modal
                 show={show}
                 onHide={handleClose}
                 backdrop="static"
                 keyboard={false}
                 animation={false}
          >

          <Modal.Header closeButton>
              <Modal.Title>
              Export Calendar
              </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              Save your calendar to your documents folder.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary">
                Export
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
          </ButtonToolbar>

        </Col>
      </Row>
      </Container>



    </div>
);


}
