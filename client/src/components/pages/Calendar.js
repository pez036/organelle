import React, { useState, useEffect, useRef } from 'react';
import MonthandYear from '../calendar/monthandyear';
import NavBar from '../layout/NaviBar';
import "../layout/calendar.css";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import days from '../calendar/days';
import dayStyles from '../calendar/dayStyles';
//import EventCalendar from '../pages/EventCalendar';
import Header from "../layout/Header";
import AddEventModal from "../misc/AddEventModal";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { useHistory } from "react-router-dom";


export default function Calendar() {

const [calendar,setCalendar] = useState([]);
const [value, setValue] = useState(moment());
const [modalToggle, setModalToggle] = useState(false);
const [userEvents,setUserEvents] = useState([]);

const modalHandler = () => {
  // e.preventDefault(); //i added this to prevent the default behavior
  modalToggle ? setModalToggle(false) : setModalToggle(true);

}



useEffect(() => {
  setCalendar(days(value));

  const eventImports = async() => {
    try{

      const eventURL = "http://localhost:8080/events/all";
      let token = localStorage.getItem("auth-token");
      const eventRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});
      setUserEvents(JSON.stringify(eventRes.data));
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

},[value])


/*function currMonthName(){
  return value.format("MMM");
}

function currYear(){
  return value.format("YYYY");
}*/

return (
  <div><Header/>
    <div>
        <NavBar/>
        <AddEventModal action={modalHandler} show={modalToggle}/>
        <div className = "top-padding">
          <MonthandYear/>
        </div>

        <div className = "top-right">
        <hr/>
          <div className ="calendar">
            <div className = "header">
              <div>

              </div>
              <div>

              </div>
            </div>

            <div className = "body">
            <div className = "day-names">
            {
              ["Sun","Mon", "Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div className="week" key={d}>
                {d}
                </div>
            ))}

            </div>
              {userEvents}
              {calendar.map((week) =>(
                <div key={week}>
                  {week.map((day)=>(
                      <div className="day" key={day}
                        onClick={()=>setValue(day)}>

                          <div className={`button-align ${dayStyles(day,value) === "before" ? 'before' : ''}`}>
                            <Button onClick={modalHandler} variant="light" size="sm">+</Button>
                            </div>

                            <div className={dayStyles(day,value)}>
                              <div className="text-leftPadding">
                                {day.format("D")}
                              </div>
                            </div>
                        </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
    </div>
    </div>
);
}
