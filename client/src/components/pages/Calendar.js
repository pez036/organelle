import React, { useState, useEffect } from 'react';
import MonthandYear from '../calendar/monthandyear';
import NavBar from '../layout/NaviBar';
import "../layout/calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import days from '../calendar/days';
import dayStyles from '../calendar/dayStyles';
import EventCalendar from '../pages/EventCalendar';


export default function Calendar() {

const [calendar,setCalendar] = useState([]);
const [value, setValue] = useState(moment());


useEffect(() => {
  setCalendar(days(value));
},[value])


function currMonthName(){
  return value.format("MMM");
}

function currYear(){
  return value.format("YYYY");
}

return (
  <div>
      <NavBar/>

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
              <div className="week">
              {d}
              </div>
          ))}
          
          </div>
            {calendar.map((week) =>(
              <div>
                {week.map((day)=>(
                    <div className="day"
                      onClick={()=>setValue(day)}>

                        <div className = "button-align">
                          <Button variant="light" size="sm">+</Button>
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
);
}
