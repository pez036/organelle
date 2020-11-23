import React from 'react';
import reactBS from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function alertClicked() {
    alert('You clicked it!!');
}


export default function Event(){
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
        </div>
    )
}
