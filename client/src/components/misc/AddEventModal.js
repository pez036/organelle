import React,{ useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Axios from "axios";
import Datetime from 'react-datetime';
import ErrorNotice from './ErrorNotice';
import "react-datetime/css/react-datetime.css";


export default function AddEventModal(props){

    const [showAddEvent, setShowAddEvent] = useState(props.show);
    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState("");

    let title = "";
    const [type] = useState("");
    let description = "";
    let priority = 0;

    const [startTime, setEventStartTime] = useState(moment(props.day).startOf("day").toISOString());
    const [endTime, setEventEndTime] = useState(moment(props.day));
    const [error, setError] = useState();


    useEffect(() => {

        setShowAddEvent(props.show);
        getCourseList();
        onDatePickerChange(props.day);

    },[props.show,props.day])

    function onDatePickerChange(e) {
        setEventStartTime(moment(e).startOf("day").toISOString());
        setEventEndTime(e);
    }

    function handleAddEventClose() {
        return props.action();
    }


    const newEventSubmit = async(e) => {

      e.preventDefault();

      try{
        title = document.getElementById("formGroupName").value;
        description = document.getElementById("formGroupDescription").value;
        priority = document.getElementById("formGroupPriority").value === "High" ? 3 : document.getElementById("formGroupPriority").value === "Medium" ? 2 : 1;
        const eventTag = {title: title,
          type: type, startTime: startTime, endTime: endTime,
          priority:priority, description: description, courseName: courseName};

        const eventURL = process.env.NODE_ENV === "production"?
              "https://organelle.pzny.xyz/events/add":
              "http://localhost:8080/events/add";
        let token = localStorage.getItem("auth-token");
        await Axios.post(eventURL,eventTag,{headers: {"x-auth-token": token}});
        
        return props.action();

      } catch (err){
        setError(err.response.data.msg);

      }

    }


    function getCourseList() {
        let token = localStorage.getItem("auth-token");
        const coursesURL = process.env.NODE_ENV === "production"?
        "https://organelle.pzny.xyz/courses/all" :
        'http://localhost:8080/courses/all'
        Axios.get(coursesURL,{headers: {"x-auth-token": token}})
        .then(
            (response) => {
                setCourseList(response.data);
            }
        )
        .catch((error) => {console.log(error);})
    }
    
    return(




        <Modal show={showAddEvent} onHide={handleAddEventClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form.Group controlId="formGroupName">
                    <Form.Label>Event Name *</Form.Label>
                    <Form.Control type="name" placeholder="What is this event?"/>
                </Form.Group>
                <Form.Group controlId="formGroupCourse">
                                <Form.Label>Course</Form.Label>
                                <Form.Control as="select" defaultValue={courseName} onChange={(e)=>setCourseName(e.target.value)}>
                                        <option>Choose from Enrolled Courses</option>
                                        {courseList.map((data,key) =>
                                        <option key={key}>{data.courseName}</option>
                                    )}
                                </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Due Time</Form.Label>
                        <Datetime initialValue={moment(props.day)} dateFormat={false} onChange={(e)=>onDatePickerChange(e)}/>
                </Form.Group>
                    

                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?"/>
                </Form.Group>
                <Form.Group controlId="formGroupPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control  as="select" defaultValue="Low">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </Form.Control>
                </Form.Group>

            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newEventSubmit}>Save</Button>
                <Button variant="primary" onClick={handleAddEventClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
