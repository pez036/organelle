import React,{useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../layout/todoList.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddEventModal_Todo from "../../misc/AddEventModal_Todo";
import AddCourseModal_Todo from "../../misc/AddCourseModal";
import DropCourseModal_Todo from "../../misc/DropCourseModal";
import EditEventModal_Todo from "../../misc/EditEventModal_todo";
import eventStyles from "../../calendar/eventStyles"
import Axios from "axios";
import moment from 'moment';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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
        "https://organelle.pzny.xyz/events/":
        "http://localhost:8080/events/";

    const Edit = () => {
        editEventModalHandler();
        editEvent ? setEditEvent(false) : setEditEvent(true);
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

                  } catch (err) {
                      console.log(err);
                  }

                }

                initialImport();


          }, [deleteEvent,checkedOff,addEventModal,addCourseModal,dropCourseModal,editEventModal])

    const displayEventTime = (time) =>
    {
      return moment(time).format('LLLL');
    }

    return(
        <div>

                <div className="EventListHeader">
                <AddEventModal_Todo action={addEventModalHandler} show={addEventModal}/>
                <AddCourseModal_Todo action={addCourseModalHandler} show={addCourseModal}/>
                <DropCourseModal_Todo action={dropCourseModalHandler} show={dropCourseModal}/>
                <EditEventModal_Todo action={editEventModalHandler} show={editEventModal} id={eventID} />
                
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
                  .sort((a,b) =>(b.priority - a.priority)|| Date.parse(a.endTime)- Date.parse(b.endTime))
                  .map((event) => (
                    <div>
                        <br/>
                        <p>{'>'} Deadline: {displayEventTime(event.endTime)}</p>

                            <ListGroup.Item variant={eventStyles(event.priority)} className="listgroupEvent">
                                <Row>
                                    <Col xs={8} >{event.title}</Col>
                                    <Col xs={1}>
                                        <ButtonGroup className="mb-2">
                                            <Button onClick={() => Edit(setEventID(event._id))}>Edit</Button>
                                            <Button onClick={() => Delete(event._id)}>Delete</Button>
                                            <BootstrapSwitchButton
                                                checked={event.priority * -1 > 0}
                                                onlabel='&#x2713;'
                                                onstyle='success'
                                                offlabel='&#10007;'
                                                offstyle='danger'
                                                onChange={(checked) => {
                                                    if(checked) CheckOff(event._id);
                                                    else UnCheckOff(event._id);
                                                }}
                                            />
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                    </div>

                ))}
                </ListGroup>


        </div>
    )
}
