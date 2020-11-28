import React,{useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddEventModal(props){
    
    const [showAddEvent, setShowAddEvent] = useState(false);

    useEffect(() => {
        setShowAddEvent(props.show);
    })

    function handleAddEventClose() {
        props.action();
        return setShowAddEvent(false);
    }

    function newEventSubmit(){
        /*Todo*/
        return setShowAddEvent(false);
    }


    return(

        
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
    )
}