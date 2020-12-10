import React from 'react';
import NavBar from '../layout/NaviBar';
import "../layout/todoList.css";
import EventList from "../layout/todolist/EventList";

export default function Todo() {
    return (
      <div>
          <NavBar/>
          <div className = "top-left">
            <EventList />
          </div>

      </div>);
}
