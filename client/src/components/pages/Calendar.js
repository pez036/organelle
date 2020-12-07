import React, { useState, useEffect, useRef } from 'react';
import MonthandYear from '../calendar/monthandyear';
import NavBar from '../layout/NaviBar';
import "../layout/calendar.css";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import days from '../calendar/days';
import dayStyles from '../calendar/dayStyles';
import DayEvents from '../misc/dayEvents';
//import EventCalendar from '../pages/EventCalendar';
import Header from "../layout/Header";
import AddEventModal from "../misc/AddEventModal";
import EditEventModal from "../misc/EditEventModal_calendar"
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { useHistory } from "react-router-dom";


export default function Calendar() {


const [value, setValue] = useState(moment());
const [calendar,setCalendar] = useState(days(value));
const [modalToggle, setModalToggle] = useState(false);
const [editToggle, setEditToggle] = useState(false);
const [userEvents,setUserEvents] = useState([]);
const [dayPasser, setDayPasser] = useState(moment());
const [eventId, setEventId] = useState("");
const modalHandler = (day) => {
  // e.preventDefault(); //i added this to prevent the default behavior
  setDayPasser(day);
  modalToggle ? setModalToggle(false) : setModalToggle(true);

}
const editHandler = (id) => {
  setEventId(id);
  // e.preventDefault(); //i added this to prevent the default behavior
  editToggle ? setEditToggle(false) : setEditToggle(true);

}

const prevMonth = () => {
  setValue(value.subtract(1,"month"));
  setCalendar(days(value));
  return value;

}

const nextMonth = () => {
  setValue(value.add(1,"month"));
  setCalendar(days(value));
  return value;
}

useEffect(() => {

},[calendar,value,modalToggle])


/*function currMonthName(){
  return value.format("MMM");
}

function currYear(){
  return value.format("YYYY");
}*/

return (
  <div>
        {/* <Header/> */}

        <NavBar/>
        <AddEventModal action={modalHandler} show={modalToggle} day={dayPasser}/>
        <EditEventModal action={editHandler} show={editToggle} id={eventId}/>
        <div className = "top-padding">
          <MonthandYear value={value} nextMonth={nextMonth} prevMonth={prevMonth}/>
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
              {calendar.map((week) =>(
                <div key={week}>
                  {week.map((day)=>(

                      <div className="day" key={day}>
                          <div className={`button-align ${dayStyles(day,value) === "before" ? 'before' : ''}`}>
                            <Button onClick={()=>modalHandler(day)} variant="light" size="sm">+</Button>
                          </div>
                            <div className="text-left">
                              {day.format("D")}
                            </div>
                                
                          <div className="list-events">
                            <DayEvents action={editHandler} thisDay={day} render={modalToggle}/>
                          </div>

                      </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
    </div>

);
}
