import React, { useState } from 'react';
import NavBar from '../layout/NaviBar';
import "../layout/todoList.css";

/*import backgroundSample from '../../image/bg2.jpg';
import TodoForm from './TodoComponents/TodoForm';
import TodoList from './TodoComponents/TodoList';*/

export default function Todo() {
    return (
    <div>
          <NavBar/>
      <div class = "top-right">
        <body>
            <p class="layer1">Todo List</p>
            <p class="layer2">Nov 21,2020 Nov 22,2020</p>
        </body>
      </div>
    </div>);
}
