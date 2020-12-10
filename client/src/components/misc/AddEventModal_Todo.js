import React,{useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import moment from 'moment';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function AddEventModalTodo(props){

    const [title, setEventTitle] = useState("");
    const [description, setEventDescription] = useState("");
    const [priority, setEventPriority] = useState("");
    const [type, setEventType] = useState("");

    const [startTime, setEventStartTime] = useState();
    const [endTime, setEventEndTime] = useState();


    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState("");

    const [showAddEvent, setShowAddEvent] = useState(props.show);

    useEffect(() => {
        setShowAddEvent(props.show);
        getCourseList();
    },[props.show])

    function handleClose() {
        return  props.action();
    }

const newEventSubmit = async(e) => {

      e.preventDefault();


      try{
        const eventTag = {title: title, type: type, startTime: startTime, endTime: endTime,
                        priority:priority, description: description, courseName: courseName};
        const eventURL = process.env.NODE_ENV === "production"?
              "http://organelle.pzny.xyz/events/add":
              "http://localhost:8080/events/add";
        let token = localStorage.getItem("auth-token");

        await Axios.post(eventURL,eventTag,{headers: {"x-auth-token": token}});

      } catch (err){
        console.log(err);
      }

      return props.action();
    }

    function getCourseList() {
        let token = localStorage.getItem("auth-token");
        const coursesURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/courses/all":
            "http://localhost:8080/courses/all";
        Axios.get(coursesURL,{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
        .then(
            (response) => {
                setCourseList(response.data);

            }
        )
        .catch( (error) => {console.log(error); })
      }

      /*function getDays(year,month) {
            if(month === "02"){
                if(year === "2020" ||year === "2024" ||year === "2028" ||year === "2032" ||year === "2036"){
                    setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29"]);}
                else{
                    setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28"]);
                }
            }
            else if(month === "01" || month === "03"|| month === "05"|| month === "07"|| month === "08"|| month === "10"|| month === "12"){
                setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]);
            }
            else{setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]);}
      }*/

    /*function updateDays(){
        updateTime();
        getDays(year,month);
        console.log("update!");

    }*/

    /*function updateTime(){
        setEventStartTime(moment(""+year+"-"+month+"-"+day+"T"+hour+":"+min+":00.000Z").startOf("day").toISOString());
        setEventEndTime(""+year+"-"+month+"-"+day+"T"+hour+":"+min+":00.000Z");
    }*/

    function onDatePickerChange(e) {
        setEventStartTime(moment(e).startOf("day").toISOString());
        setEventEndTime(e);
    }

    return(
        <Modal show={showAddEvent} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="name" placeholder="What is this event?" onChange={(e)=>setEventTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formGroupCourse">
                    <Form.Label>Course</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={(e)=>setCourseName(e.target.value)}>
                        <option>Choose...</option>
                        {courseList.map((data,key) =>
                        <option key={key}>{data.courseName}</option>
                    )}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="formDatePicker">
                    <Form.Label>Due Date</Form.Label>
                    <Datetime onChange={(e)=>onDatePickerChange(e)}/>
                </Form.Group>
                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?" onChange={(e)=>setEventDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupType">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Control type="type" placeholder="Is this a Lecture or Discussion or Assignment or Something else?" onChange={(e)=>setEventType(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" onChange={(e)=>setEventPriority(e.target.value)} defaultValue="How important is this event?">
                        <option>How important is this event?</option>
                        <option value = "3">High</option>
                        <option value = "2">Medium</option>
                        <option value = "1">Low</option>
                    </Form.Control>
                </Form.Group>

            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newEventSubmit}>Save</Button>
                <Button variant="primary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
