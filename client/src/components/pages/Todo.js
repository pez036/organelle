import React from 'react';
import NavBar from '../layout/NaviBar';
import "../layout/todoList.css";
import EventList from "../layout/todolist/EventList";
/*import backgroundSample from '../../image/bg2.jpg';
import TodoForm from './TodoComponents/TodoForm';
import TodoList from './TodoComponents/TodoList';*/

export default function Todo() {
    return (
      <div>
        {/* <Header/> */}
          <NavBar/>
          <div className = "top-left">
            <EventList />
          </div>

      </div>);
}
