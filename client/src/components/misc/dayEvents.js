import React,{ useState, useEffect, useContext} from 'react';
import moment from 'moment';
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { useHistory } from "react-router-dom";
import eventStyles from "../calendar/eventStyles";
import "../layout/calendar.css";

export default function DayEvents(props){

  const [dayEvents,setDayEvents] = useState([]);
  const [day, setDay] = useState(moment(props.thisDay).startOf("day").toISOString());
  const [eventID, setEventID] = useState(null);



  useEffect(() => {

    setDay(moment(props.thisDay).startOf("day").toISOString());

    const eventDayImports = async() => {
          try{
            const eventURL = process.env.NODE_ENV === "production"?
                "http://organelle.pzny.xyz/events/time/"+day:
                "http://localhost:8080/events/time/"+day;
            let token = localStorage.getItem("auth-token");
            const dayRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});
            setDayEvents(dayRes.data);
            console.log("called");


          }catch (err){
            console.log("This is event res ERR:");
            console.log(err);
          }

      }

    eventDayImports();
  },[props.render]);



  return(
    <div>
    <ListGroup>
      {dayEvents.map((e)=>(

          <ListGroup.Item onClick={()=>props.action(e._id)} action variant={eventStyles(e.priority)}>
              <div className="title-list">
                {e.title}
              </div>
          </ListGroup.Item>

      ))}

        </ListGroup>
    </div>

  );


}
