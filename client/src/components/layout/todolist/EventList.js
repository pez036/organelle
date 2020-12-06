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
import eventStyles from "../../calendar/eventStyles"
import Axios from "axios";
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
    const [userEvents,setUserEvents] = useState([]);
    // const [eventRes, setEventRes] = useState([]);

    useEffect(() => {
      
        const eventImports = async() => {
          try{
      
            const eventURL = "http://localhost:8080/events/all";
            let token = localStorage.getItem("auth-token");
            let eventRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});
            setUserEvents(eventRes.data);
            console.log("EVENT");
            console.log(eventRes.data);
          /*
            const eventRes = await Axios.post(eventURL,
              {header: {
                "x-auth-token": token
              }}, {data: {eventTag}}
            );
      
            console.log("This is event res:", eventRes);  */
      
          } catch (err){
            console.log("This is event res ERR:");
            console.log(err);
          }
      
        }
      
        eventImports();
      
      }, [AddEventModal])

    return(
        <div>

                <div className="EventListHeader">
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
                </div>


                <ListGroup variant="flush">
                {userEvents.map((event) => (
                    
                    <div>
                        <br/>
                        <p>{'>'} Deadline: {event.endTime.substring(0,10)} {event.endTime.substring(12,16)}</p>

                            <ListGroup.Item variant={eventStyles(event.priority)} className="listgroupEvent">
                                <Row>
                                    <Col xs={9} >{event.title} | {event.priority} </Col>
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
                    </div>
                    
                ))}
                </ListGroup>

            {/* <p className="EventList">
                <Event/>
            </p> */}

        </div>
    )
}
