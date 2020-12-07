import React,{ useState, useEffect} from 'react';
import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';
import Axios from "axios";
import eventStyles from "../calendar/eventStyles";
import "../layout/calendar.css";

export default function DayEvents(props){

  const [dayEvents,setDayEvents] = useState([]);
  const [day, setDay] = useState(moment(props.thisDay).startOf("day").toISOString());

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
  },[props.render,props.action]);



  return(
    <div>
    <ListGroup>
        {dayEvents
          .sort((a, b) => b.priority - a.priority || Date.parse(a.endTime) - Date.parse(b.endTime))
          .slice(0,4)
          .map((e) => (
            <ListGroup.Item onClick={()=>props.action(e._id)} action variant={eventStyles(e.priority)}>
              <div className="title-list">
                {e.title.substring(0,10)} | {moment(e.endTime).format('LT')}
              </div>
            </ListGroup.Item>
      ))}

      </ListGroup>
     
    </div>

  );


}
