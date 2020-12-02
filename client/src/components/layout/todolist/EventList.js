import React,{useState} from 'react';
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
import Event from "./Event";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddEventModal_Todo from "../../misc/AddEventModal_Todo";
import AddCourseModal_Todo from "../../misc/AddCourseModal";
import DropCourseModal_Todo from "../../misc/DropCourseModal";
export default function EventList(){


    const [AddEventModal, setAddEventModal] = useState(false);
    const AddEventModalHandler = () => {
        AddEventModal ? setAddEventModal(false) : setAddEventModal(true);
    }

    const [AddCourseModal, setAddCourseModal] = useState(false);
    const AddCourseModalHandler = () => {
        AddCourseModal ? setAddCourseModal(false) : setAddCourseModal(true);
    }

    const [DropCourseModal, setDropCourseModal] = useState(false);
    const DropCourseModalHandler = () => {
        DropCourseModal ? setDropCourseModal(false) : setDropCourseModal(true);
    }


    return(
        <div>

                <p className="EventListHeader">
                <AddEventModal_Todo action={AddEventModalHandler} show={AddEventModal}/>
                <AddCourseModal_Todo action={AddCourseModalHandler} show={AddCourseModal}/>
                <DropCourseModal_Todo action={DropCourseModalHandler} show={DropCourseModal}/>
                <Row>
                    <Col lg={6}>TodoList</Col>
                    <Row lg={1}>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={AddEventModalHandler}>
                                Add an Event
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={AddCourseModalHandler}>
                                Create a Course
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={DropCourseModalHandler}>
                                Drop a Course
                            </Button>
                        </Col>
                    </Row>

                </Row>
                </p>

            <p className="EventList">
                <Event/>
            </p>

        </div>
    )
}
