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

    const [title2, setEventTitle2] = useState("");
    const [description2, setEventDescription2] = useState("");
    const [priority2, setEventPriority2] = useState("");
    const [type2, setEventType2] = useState("");
    const [startTime2, setEventStartTime2] = useState("");
    const [endTime2, setEventEndTime2] = useState("");
    const [courseName2, setCourseName2] = useState("");
    const [courseList, setCourseList] = useState([]);

    const [dayList,setDayList] = useState([]);
    const [year,setYear] = useState("");
    const [month,setMonth] = useState("");
    const [day,setDay] = useState("");
    const [hour,setHour] = useState("");
    const [min,setMin] = useState("");

    const [showEdit, setShowEdit] = useState(props.show);

    const getEvent = async() => {

              console.log("EventID:", props.id);
              let token = localStorage.getItem("auth-token");
              const eventURL = process.env.NODE_ENV === "production"?
              'http://organelle.pzny.xyz/events/'+ props.id:
              'http://localhost:8080/events/'+props.id
              Axios.get(eventURL,{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
                  .then(
                      (response) => {
                          console.log(response);
                          setEventTitle2(response.data.title);
                          setCourseName2(response.data.courseName);
                          setEventDescription2(response.data.description);
                          setEventPriority2(response.data.priority);
                          setEventStartTime2(response.data.startTime);
                          setEventEndTime2(moment(response.data.endTime).format('LLLL'));
                          setEventType2(response.data.type)
                      }
                  )
                  .catch( (error) => {console.log(error); })
    }


    useEffect(() => {

        setShowEdit(props.show);
        function getCourseList() {
             let token = localStorage.getItem("auth-token");
             const courseURL = process.env.NODE_ENV === "production"?
             'http://organelle.pzny.xyz/courses/all':
             'http://localhost:8080/courses/all'
             Axios.get(courseURL,{headers: {"x-auth-token": token}})/*NOTICE: this may not be correct.*/
             .then(
                 (response) => {
                     setCourseList(response.data);
                 }
             )
             .catch( (error) => {console.log(error); })
           }



        getCourseList();

        getEvent();
        getCourseList();
        setEventPriority2("");
        setEventType2("");
        setEventStartTime2("");
        setEventDescription2("");
        setCourseName2("");
        setEventEndTime2("");
        setEventTitle2("");

    },[props.id,props.show])

    function handleClose() {
        return  props.action();
    }

    const EditSubmit = async(e) => {

        e.preventDefault();

        try{

            const eventTag = {title: title, type: type, startTime: startTime, endTime: endTime,
                priority:priority, description: description, courseName: courseName};
            console.log("this is updated info")
            console.log(eventTag);

            const eventURL = process.env.NODE_ENV === "production"?
                "http://organelle.pzny.xyz/events/"+ props.id:
                "http://localhost:8080/events/"+ props.id;
            let token = localStorage.getItem("auth-token");

            const eventRes = await Axios.put(eventURL,eventTag,{headers: {"x-auth-token": token}});
            console.log("This is event res:", eventRes);

          } catch (err){
            console.log("This is course res ERR:");
            console.log(err);
          }



        return  props.action();
      }



    function onDatePickerChange(e) {
        setEventStartTime(moment(e).startOf("day").toISOString());
        setEventEndTime(e);
    }

    return(

        <Modal show={showEdit} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="title" plaintext readOnly defaultValue= {title2}/>
                                </Form.Group>
                                <Form.Group controlId="formGroupCourse">
                                    <Form.Label>Event Course</Form.Label>
                                    <Form.Control type="course" plaintext readOnly defaultValue= {courseName2} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEndTime">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control type="EndTime" plaintext readOnly defaultValue= {endTime2} />
                                </Form.Group>

                                <Form.Group controlId="formGroupDescription">
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="description" as="textarea" rows={3} plaintext readOnly defaultValue= {description2} />
                                </Form.Group>

                                <Form.Group controlId="formGroupType">
                                    <Form.Label>Event Type</Form.Label>
                                    <Form.Control type="type" plaintext readOnly defaultValue= {type2} />
                                </Form.Group>

                                <Form.Group controlId="formGroupPriority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control type="priority" plaintext readOnly defaultValue= {priority2} />
                                </Form.Group>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="title" placeholder="What is this event?" onChange={(e)=>setEventTitle(e.target.value)} defaultValue= {title2}/>
                                </Form.Group>
                                <Form.Group controlId="formGroupCourse">
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control as="select" placeholder="Choose..." onChange={(e)=>setCourseName(e.target.value)} >
                                        <option>Choose...</option> {/** selected= */}
                                        {courseList.map((data,key) =>
                                        <option key={key}>{data.courseName}</option>
                                    )}
                                    </Form.Control>
                                </Form.Group>
                            
                                <Form.Group controlId="formDatePicker">
                                    <Form.Label>End Time</Form.Label>
                                    <Datetime onChange={(e)=>onDatePickerChange(e)}/>
                                </Form.Group>
                                <Form.Group controlId="formGroupDescription">
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?" onChange={(e)=>setEventDescription(e.target.value)} defaultValue= {description2}/>
                                </Form.Group>

                                <Form.Group controlId="formGroupType">
                                    <Form.Label>Event Type</Form.Label>
                                    <Form.Control type="type" placeholder="Is this a Lecture or Something else?" onChange={(e)=>setEventType(e.target.value)} defaultValue= {type2}/>
                                </Form.Group>

                                <Form.Group controlId="formGroupPriority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control as="select" onChange={(e)=>setEventPriority(e.target.value)} placeholder="How important is this event?" defaultValue= {priority2}>
                                    <option>How important is this event?</option> {/** selected= */}
                                    <option value = "3">High</option>
                                    <option value = "2">Median</option>
                                    <option value = "1">Low</option>
                                </Form.Control>
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={EditSubmit}>Save</Button>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
    )
}
