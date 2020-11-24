import React, {useState} from 'react';
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
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


function alertClicked() {
    alert('You clicked it!!');
}


export default function Event(){

    const [show, setShow] = useState(false);
    function handleClose() {
        return setShow(false);
    }
    function handleShow() {
        return setShow(true);
    }
    function newEventSubmit(){
        /*Todo*/
        return setShow(false);
    }

    const [showDelete, setShowDelete] = useState(false);
    function handleShowDeleteClose() {
        return setShowDelete(false);
    }
    function handleShowDelete() {
        return setShowDelete(true);
    }
    function deleteSubmit(){
        /*Todo*/
        return setShowDelete(false);
    }

    return(

        <div>

            <p>{'>'}Nov 21,2020</p>

            <ListGroup variant="flush">
                <ListGroup.Item variant="primary" className="listgroupEvent">
                    <Row>
                        <Col xs={9} >Nov 21, 2020 at 21:00 | CSE110 | Group Meeting | High</Col>
                        <Col xs={1}>
                            <ButtonGroup className="mb-2">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <DropdownButton as={ButtonGroup} title="Checkoff" id="anesteddropdown">
                                    <Dropdown.Item eventKey="1">Checkoff</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">DeCheckoff</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ListGroup.Item>

            <br/>
            <p>{'>'}Nov 22,2020</p>

                <ListGroup.Item variant="primary" className="listgroupEvent">
                    <Row>
                        <Col xs={9} >Nov 22, 2020 at 23:59 | CSE101 | Status Report | High</Col>
                        <Col xs={1}>
                            <ButtonGroup className="mb-2">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <DropdownButton as={ButtonGroup} title="Checkoff" id="anesteddropdown">
                                    <Dropdown.Item eventKey="1">Checkoff</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">DeCheckoff</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    </ListGroup.Item>

                <ListGroup.Item variant="secondary" className="listgroupEvent">
                    <Row>
                        <Col xs={9} >Nov 22, 2020 at 23:59 | CSE101 | Review quiz | Median</Col>
                        <Col xs={1}>
                            <ButtonGroup className="mb-2">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <DropdownButton as={ButtonGroup} title="Checkoff" id="anesteddropdown">
                                    <Dropdown.Item eventKey="1">Checkoff</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">DeCheckoff</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Col>
                    </Row></ListGroup.Item>

            </ListGroup>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>EditEvent</Modal.Title>
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
                                    <option>21</option><option>22</option>
                                    {/*This is left as a loop TODO!!*/}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control as="select" defaultValue="1">
                                    <option>2020</option><option>2019</option>
                                    {/*This is left as a loop TODO!!*/}
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
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleShowDeleteClose} backdrop="static" keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Event!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this event?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteSubmit}>Delete</Button>
                    <Button variant="primary" onClick={handleShowDeleteClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
