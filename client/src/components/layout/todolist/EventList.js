import React,{useState} from 'react';
import reactBS from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Event from "./Event";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function EventList(){

    const [showAddEvent, setShowAddEvent] = useState(false);
    function handleAddEventClose() {
        return setShowAddEvent(false);
    }
    function handleShowAddEvent() {
        return setShowAddEvent(true);
    }
    function newEventSubmit(){
        /*Todo*/
        return setShowAddEvent(false);
    }

    const [showAddCourse, setShowAddCourse] = useState(false);
    function handleAddCourseClose() {
        return setShowAddCourse(false);
    }
    function handleShowAddCourse() {
        return setShowAddCourse(true);
    }
    function newCourseSubmit(){
        /*Todo*/
        return setShowAddCourse(false);
    }

    const [showDropCourse, setShowDropCourse] = useState(false);
    function handleDropCourseClose() {
        return setShowDropCourse(false);
    }
    function handleShowDropCourse() {
        return setShowDropCourse(true);
    }
    function dropCourseSubmit(){
        /*Todo*/
        return setShowDropCourse(false);
    }


    return(
        <div>

                <p className="EventListHeader">
                <Row>
                    <Col lg={6}>TodoList</Col>
                    <Row lg={1}>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={handleShowAddEvent}>
                                Add an Event
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={handleShowAddCourse}>
                                Create a Course
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={handleShowDropCourse}>
                                Drop a Course
                            </Button>
                        </Col>
                    </Row>

                </Row>
                </p>

            <p className="EventList">
                <Event/>
            </p>


        <Modal show={showAddEvent} onHide={handleAddEventClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="name" placeholder="What is this event?" />
                </Form.Group>
                <Form.Group controlId="formGroupCourse">
                    <Form.Label>Event Course</Form.Label>
                    <Form.Control type="course" placeholder="Where does event come?" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMonth">
                    <Form.Label>Month</Form.Label>
                    <Form.Control as="select" defaultValue="Jan">
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option>May</option>
                        <option>Jun</option>
                        <option>July</option>
                        <option>Aug</option>
                        <option>Sept</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDay">
                    <Form.Label>Day</Form.Label>
                    <Form.Control as="select" defaultValue="1">
                        <option>1</option><option>2</option>
                        /*This is left as a loop TODO!!*/
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control as="select" defaultValue="1">
                        <option>2020</option><option>2019</option>
                        /*This is left as a loop TODO!!*/
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?" />
                </Form.Group>
                <Form.Group controlId="formGroupPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" defaultValue="How important is this event?">
                        <option>How important is this event?</option>
                        <option>High-3</option>
                        <option>Median-2</option>
                        <option>Low-1</option>
                    </Form.Control>
                </Form.Group>

            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newEventSubmit}>Save</Button>
                <Button variant="primary" onClick={handleAddEventClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showAddCourse} onHide={handleAddCourseClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control type="name" placeholder="What is this course name? e.g.CSE110" />
                </Form.Group>
                <Form.Group controlId="formGroupProfessor">
                    <Form.Label>Professor</Form.Label>
                    <Form.Control type="course" placeholder="Who is the professor of this course?" />
                </Form.Group>
                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this course?" />
                </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newCourseSubmit}>Save</Button>
                <Button variant="primary" onClick={handleAddCourseClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showDropCourse} onHide={handleDropCourseClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Drop the Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupCourse">
                    <Form.Label>Course</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>Hum3</option>
                        <option>CSE152A</option>
                        <option>CSE110</option>
                        <option>CSE101</option>
                        <option>Math170B</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                    required
                    label="Warning: I know this operation will deletes all events that relevant to this course."
                    feedback="You must agree before dropping."
                    />
                 </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={dropCourseSubmit}>Drop</Button>
                <Button variant="primary" onClick={handleDropCourseClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>

        </div>
    )
}
