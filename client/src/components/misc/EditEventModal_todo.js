import React,{useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import moment from 'moment';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function EditEventModal_todo(props){

    const [title, setEventTitle] = useState("");
    const [description, setEventDescription] = useState("");
    const [priority, setEventPriority] = useState("");
    const [type, setEventType] = useState("");
    const [startTime, setEventStartTime] = useState("");
    const [endTime, setEventEndTime] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseList, setCourseList] = useState([]);
    const [showEdit, setShowEdit] = useState(props.show);

    useEffect(() => {
        setShowEdit(props.show);
        getEvent();
        getCourseList();
        setEventPriority("");
        setEventType("");
        setEventStartTime("");
        setEventDescription("");
        setCourseName("");
        setEventEndTime("");
        setEventTitle("");

    },[props.show,props.id])

    function handleClose() {
        return props.action();
    }

    const EditSubmit = async(e) => {

        e.preventDefault();

        try {
            setEventEndTime(moment(endTime).toISOString());
            const eventTag = {title: title, type: type, startTime: startTime, endTime: endTime,
                priority:priority, description: description, courseName: courseName};


            const eventURL = process.env.NODE_ENV === "production"?
                "https://organelle.pzny.xyz/events/"+ props.id:
                "http://localhost:8080/events/"+ props.id;
            let token = localStorage.getItem("auth-token");

            const eventRes = await Axios.put(eventURL,eventTag,{headers: {"x-auth-token": token}});
        
          } catch (err){
            console.log(err);
          }

        return props.action();
      }

      function getCourseList() {
        let token = localStorage.getItem("auth-token");
        const coursesURL = process.env.NODE_ENV === "production"?
        "https://organelle.pzny.xyz/courses/all" :
        'http://localhost:8080/courses/all'
        Axios.get(coursesURL,{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
        .then(
            (response) => {
                setCourseList(response.data);
            }
        )
        .catch( (error) => {console.log(error); })
      }

    function getEvent() {
        let token = localStorage.getItem("auth-token");
        const eventsURL = process.env.NODE_ENV === "production"?
        'https://organelle.pzny.xyz/events/' + props.id :
        'http://localhost:8080/events/' + props.id;
        Axios.get(eventsURL,{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
            .then(
                (response) => {
                    console.log(response);
                    setEventTitle(response.data.title);
                    setCourseName(response.data.courseName);
                    setEventDescription(response.data.description);
                    setEventPriority(response.data.priority);
                    setEventStartTime(response.data.startTime);
                    setEventEndTime(response.data.endTime);
                    setEventType(response.data.type)
                }
            )
            .catch( (error) => {console.log(error);})
    }


    function onDatePickerChange(e) {
        setEventStartTime(moment(e).startOf("day").toISOString());
        setEventEndTime(moment(e));
    }

    function displayPriority() { 
        if (priority < 0) {
            return "This event is checked-off. Select the drop-down option below to change:";
        }

        return "Change Priority:";
    }

    return(

        <Modal show={showEdit} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="title" placeholder={title} onChange={(e)=>setEventTitle(e.target.value)}/>
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

                                <Form.Group controlId="formDatePicker">
                                    <Form.Label>End Time: {moment(endTime).format('LLLL')}</Form.Label>
                                        <Datetime onChange={(e) =>onDatePickerChange(e)}/>
                                </Form.Group>


                                <Form.Group controlId="formGroupDescription">
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="description" as="textarea" rows={3} placeholder={description} onChange={(e)=>setEventDescription(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formGroupType">
                                    <Form.Label>Event Type</Form.Label>
                                    <Form.Control type="type" placeholder={type} onChange={(e)=>setEventType(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formGroupPriority">
                                <Form.Label>{displayPriority()}</Form.Label>
                            <Form.Control value={priority} as="select" onChange={(e) => setEventPriority(e.target.value)}>
                                    <option value = "3">High</option>
                                    <option value = "2">Medium</option>
                                    <option value = "1">Low</option>
                                </Form.Control>
                                </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={EditSubmit}>Save</Button>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
    )
}
