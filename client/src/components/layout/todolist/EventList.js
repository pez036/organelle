import React from 'react';
import reactBS from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Event from "./Event";
export default function EventList(){
    return(
        <div>
            <p className="EventListHeader">
                TodoList
            </p>
            <p className="EventList">
                <Event/>
            </p>
        </div>
    )
}

