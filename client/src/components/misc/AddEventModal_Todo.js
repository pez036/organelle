import React,{useState, useEffect,useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import moment from 'moment';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function AddEventModalTodo(props){

    const [title, setEventTitle] = useState("");
    const [courseID, setCourseId] = useState("");
    const [description, setEventDescription] = useState("");
    const [priority, setEventPriority] = useState("");
    const [type, setEventType] = useState("");

    const [startTime, setEventStartTime] = useState();
    const [endTime, setEventEndTime] = useState();


    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState("");
    const fakeCourse = ["CSE110","CSE101","CSE152","HUM3"];/*This is intended for tests. */
    const monthList = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const yearList = ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039"];
    const [dayList,setDayList] = useState([]);
    const hourList = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
    const minList = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
    const [year,setYear] = useState("");
    const [month,setMonth] = useState("");
    const [day,setDay] = useState("");
    const [hour,setHour] = useState("");
    const [min,setMin] = useState("");

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
        const eventURL = "http://localhost:8080/events/add";
        let token = localStorage.getItem("auth-token");

        const eventRes = await Axios.post(eventURL,eventTag,{headers: {"x-auth-token": token}});

      } catch (err){
        console.log(err);
      }

      return props.action();
    }

    function getCourseList() {
        let token = localStorage.getItem("auth-token");
        Axios.get('http://localhost:8080/courses/all',{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
        .then(
            (response) => {
                setCourseList(response.data);

            }
        )
        .catch( (error) => {console.log(error); })
      }

      function getDays(year,month) {
            if(month == "02"){
                if(year == "2020" ||year == "2024" ||year == "2028" ||year == "2032" ||year == "2036"){
                    setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29"]);}
                else{
                    setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28"]);
                }
            }
            else if(month == "01" || month == "03"|| month == "05"|| month == "07"|| month == "08"|| month == "10"|| month == "12"){
                setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]);
            }
            else{setDayList(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]);}
      }

    function updateDays(){
        updateTime();
        getDays(year,month);
        console.log("update!");

    }

    function updateTime(){
        setEventStartTime(moment(""+year+"-"+month+"-"+day+"T"+hour+":"+min+":00.000Z").startOf("day").toISOString());
        setEventEndTime(""+year+"-"+month+"-"+day+"T"+hour+":"+min+":00.000Z");
    }

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

            {/*
                <Form.Row>
                        <Form.Group as={Col} controlId="FormYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..."  onClick={updateDays} onChange={(e)=>setYear(e.target.value)}>
                                <option onClick={updateDays}>Choose...</option>
                                {yearList.map((year,key) =>
                                <option onClick={updateDays} key={key}>{year}</option>
                            )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="FormMonth">
                            <Form.Label>Month</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onClick={updateDays} onChange={(e)=>setMonth(e.target.value)}>
                                <option onClick={updateDays}>Choose...</option>
                                {monthList.map((month,key) =>
                                <option onClick={updateDays} key={key}>{month}</option>
                            )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="FormDay">
                            <Form.Label>Day</Form.Label>
                            <Form.Control as="select" onClick={updateDays} defaultValue="Choose..." onChange={(e)=>setDay(e.target.value)}>
                                <option onClick={updateDays}>Choose...</option>
                                {dayList.map((day,key) =>
                                <option onClick={updateDays} key={key}>{day}</option>
                            )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="FormHour">
                            <Form.Label>Hour</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onClick={updateDays} onChange={(e)=>setHour(e.target.value)}>
                                <option onClick={updateDays}>Choose...</option>
                                {hourList.map((hour,key) =>
                                <option onClick={updateDays} key={key}>{hour}</option>
                            )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="FormMinute">
                            <Form.Label>Minute</Form.Label>
                            <Form.Control as="select"defaultValue="Choose..." onClick={updateDays} onChange={(e)=>setMin(e.target.value)}>
                                <option onClick={updateDays}>Choose...</option>
                                {minList.map((min,key) =>
                                <option onClick={updateDays} key={key}>{min}</option>
                            )}
                            </Form.Control>
                        </Form.Group>
                </Form.Row>
                <Button variant="primary" onClick={updateTime} block>Save Time</Button>
            */}
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
