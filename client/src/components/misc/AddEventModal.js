import React,{ useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Axios from "axios";



export default function AddEventModal(props){

    const [showAddEvent, setShowAddEvent] = useState(props.show);


    let title = "";
    const [type] = useState("");
    let description = "";
    // const [priority, setEventPriority] = useState(3);
    let priority = 3;
    const [courseID] = useState("");
    //const [user, setUser] = useState(null);

    const [startTime, setEventStartTime] = useState(moment());
    console.log("Event Start Time");
    console.log(startTime.toString());

    const [endTime, setEventEndTime] = useState(moment());
    console.log("Event: End Time");
    console.log(endTime.toString());


    useEffect(() => {
        setShowAddEvent(props.show);
        setEventEndTime(moment(props.day).endOf("day").toISOString());
        setEventStartTime(moment(props.day).startOf("day").toISOString());
    },[props.show,props.day])


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
          priority:priority, description: description, courseID: courseID};
        console.log(eventTag);

        const eventURL = "http://localhost:8080/events/add";
        let token = localStorage.getItem("auth-token");
        const eventRes = await Axios.post(eventURL,eventTag,{headers: {"x-auth-token": token}});
/*
        const eventRes = await Axios.post(eventURL,
          {header: {
            "x-auth-token": token
          }}, {data: {eventTag}}
        );
*/
        console.log("This is event res:", eventRes);

      } catch (err){
        console.log("This is event res ERR:");
        console.log(err);
      }

      return props.action();
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
                    <Form.Control type="name" placeholder="What is this event?"/>
                </Form.Group>
                <Form.Group controlId="formGroupCourse">
                    <Form.Label>Event Course</Form.Label>
                    <Form.Control type="course" placeholder="Where does event come?"/>
                </Form.Group>


                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?"/>
                </Form.Group>
                <Form.Group controlId="formGroupPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" defaultValue="How important is this event?">
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
