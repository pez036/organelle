import Header from 'components/layout/Header';
import React, { useState } from 'react';
import NavBar from '../layout/NaviBar';
import "../layout/todoList.css";
import Event from "../layout/todolist/Event";
import EventList from "../layout/todolist/EventList";
/*import backgroundSample from '../../image/bg2.jpg';
import TodoForm from './TodoComponents/TodoForm';
import TodoList from './TodoComponents/TodoList';*/

export default function Todo() {
    return (
      <div>
        <Header/>
        <div>
          <NavBar/>
          <div className = "top-left">
            <EventList />
          </div>
        </div>
      </div>);
}
