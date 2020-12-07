import React,{useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../layout/todoList.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import AddEventModal_Todo from "../../misc/AddEventModal_Todo";
import AddCourseModal_Todo from "../../misc/AddCourseModal";
import DropCourseModal_Todo from "../../misc/DropCourseModal";
import EditEventModal_Todo from "../../misc/EditEventModal_todo";
import eventStyles from "../../calendar/eventStyles"
import Axios from "axios";
import moment from 'moment';

export default function EventList(){


  const [eventID,setEventID] = useState("");

  const [editEventModal, setEditEventModal] = useState(false);
  const editEventModalHandler = () => {
      editEventModal ? setEditEventModal(false) : setEditEventModal(true);
  }

  const [addEventModal, setAddEventModal] = useState(false);
  const addEventModalHandler = () => {
      addEventModal ? setAddEventModal(false) : setAddEventModal(true);
  }

  const [addCourseModal, setAddCourseModal] = useState(false);
  const addCourseModalHandler = () => {
      addCourseModal ? setAddCourseModal(false) : setAddCourseModal(true);
  }

  const [dropCourseModal, setDropCourseModal] = useState(false);
  const dropCourseModalHandler = () => {
      dropCourseModal ? setDropCourseModal(false) : setDropCourseModal(true);
  }
  const [userEvents,setUserEvents] = useState([]);
    // const [eventRes, setEventRes] = useState([]);

  const [deleteEvent, setDeleteEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [checkedOff, setCheckedOff] = useState(false);

  const eventsURL = process.env.NODE_ENV === "production"?
        "http://organelle.pzny.xyz/events/":
        "http://localhost:8080/events/";

    const Edit = () => {
              editEventModalHandler();
    }

    const Delete = (id) => {
        if(window.confirm("This will permanently delete the event. Are you sure?")){
              let token = localStorage.getItem("auth-token");
              Axios.delete(eventsURL+id,{headers: {"x-auth-token": token}})
                  .then(
                      (response) => {
                          deleteEvent ? setDeleteEvent(false) : setDeleteEvent(true);
                          console.log(deleteEvent);
                          console.log(response);
                      }
                  )
                  .catch( (error) => {console.log(error); })

          }
        }
    const CheckOff = (id) => {

              let token = localStorage.getItem("auth-token");
              Axios.get(eventsURL + id,{headers: {"x-auth-token": token}})
                  .then(
                      (response) => {
                          let temp = response.data.priority;
                          if (response.data.priority > 0) {
                               temp = 0 - response.data.priority;
                          }
                          const eventTag = {
                          title: response.data.title, type: response.data.type, startTime: response.data.startTime,
                              endTime: response.data.endTime, priority: temp, description: response.data.description,
                              courseName: response.data.courseName
                          };
                          console.log(eventTag);
                          const eventURL = eventsURL + id;
                          Axios.put(eventURL, eventTag, {headers: {"x-auth-token": token}}).then(
                            () => {
                                checkedOff ? setCheckedOff(false) : setCheckedOff(true);
                            }).catch();

                          }

                      )
                      .catch( (error) => {console.log(error); })
              }

    const UnCheckOff = (id) => {

              let token = localStorage.getItem("auth-token");
              Axios.get(eventsURL + id,{headers: {"x-auth-token": token}})
                  .then(
                      (response) => {
                          let temp = response.data.priority;
                          if (response.data.priority < 0) {
                              temp = 0 - response.data.priority;
                          }
                          const eventTag = {
                              title: response.data.title, type: response.data.type, startTime: response.data.startTime,
                              endTime: response.data.endTime, priority: temp, description: response.data.description,
                              courseName: response.data.courseName
                          };
                          console.log(eventTag);
                          const eventURL = eventsURL + id;

                          Axios.put(eventURL, eventTag, {headers: {"x-auth-token": token}}).then(
                                () => {
                                    checkedOff ? setCheckedOff(false) : setCheckedOff(true);
                                }).catch();
                      }
                  )
                  .catch( (error) => {console.log(error); })

          }

          useEffect(() => {

            const initialImport = async() => {

                  try{

                    const eventURL = eventsURL + "all";
                    let token = localStorage.getItem("auth-token");
                    let eventRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});
                    setUserEvents(eventRes.data);
                    console.log("Use Effect Called");

                  } catch (err){
                    console.log("This is event res ERR:");
                    console.log(err);
                  }

                }

                initialImport();


          }, [deleteEvent,editEvent,checkedOff,eventID,addEventModal,addCourseModal,dropCourseModal])

    const displayEventTime = (time) =>
    {
      return moment(time).toString();
    }

    return(
        <div>

                <div className="EventListHeader">
                <AddEventModal_Todo action={addEventModalHandler} show={addEventModal}/>
                <AddCourseModal_Todo action={addCourseModalHandler} show={addCourseModal}/>
                <DropCourseModal_Todo action={dropCourseModalHandler} show={dropCourseModal}/>
                <EditEventModal_Todo action={editEventModalHandler} show={editEventModal} id={eventID}/>
                <Row>
                    <Col lg={6}>TodoList</Col>
                    <Row lg={1}>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={addEventModalHandler}>
                                Add an Event
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={addCourseModalHandler}>
                                Create a Course
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="dark" size="lg" onClick={dropCourseModalHandler}>
                                Drop a Course
                            </Button>
                        </Col>
                    </Row>

                </Row>
                </div>


                <ListGroup variant="flush">
                {userEvents
                  .sort((a,b) =>(b.priority - a.priority))
                  .map((event) => (
                    <div>
                        <br/>
                        <p>{'>'} Deadline: {displayEventTime(event.endTime)}</p>

                            <ListGroup.Item variant={eventStyles(event.priority)} className="listgroupEvent">
                                <Row>
                                    <Col xs={9} >{event.title} | {event.priority} </Col>
                                    <Col xs={1}>
                                        <ButtonGroup className="mb-2">
                                            <Button onClick={() => Edit(setEventID(event._id))}>Edit</Button>
                                            <Button onClick={() => Delete(event._id)}>Delete</Button>
                                            <DropdownButton as={ButtonGroup} title="Options" id="anesteddropdown">
                                                <Dropdown.Item eventKey="1" onClick={() => CheckOff(event._id)}>Checkoff</Dropdown.Item>
                                                <Dropdown.Item eventKey="2" onClick={() => UnCheckOff(event._id)}>DeCheckoff</Dropdown.Item>
                                            </DropdownButton>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                    </div>

                ))}
                </ListGroup>

            {/* <p className="EventList">
                <Event/>
            </p> */}

        </div>
    )
}
