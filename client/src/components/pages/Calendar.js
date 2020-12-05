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
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { useHistory } from "react-router-dom";


export default function Calendar() {


const [value, setValue] = useState(moment());
const [calendar,setCalendar] = useState(days(value));
const [modalToggle, setModalToggle] = useState(false);
const [userEvents,setUserEvents] = useState([]);
const [dayPasser, setDayPasser] = useState(moment());

const modalHandler = (day) => {
  // e.preventDefault(); //i added this to prevent the default behavior
  setDayPasser(day);
  modalToggle ? setModalToggle(false) : setModalToggle(true);

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
  const eventImports = async() => {
    try{

      const eventURL = "http://localhost:8080/events/all";
      let token = localStorage.getItem("auth-token");
      let eventRes = await Axios.get(eventURL,{headers: {"x-auth-token": token}});
      setUserEvents(eventRes.data);
      // console.log(JSON.stringify(userEvents));
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

                          <div className={`text-leftPadding`}>
                                {day.format("D")}
                                <div>
                                  <DayEvents thisDay={day} render={modalToggle}/>
                                </div>
                          </div>
                          {/* <div  className={dayStyles(day,value)}>
                          </div> */}

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
