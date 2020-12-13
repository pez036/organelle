import React,{useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";

export default function DropCourseModal(props){


    //getCourseList();
    const [courseList, setCourseList] = useState([]);
    //let courseList = getCourseList();

    const [courseName, setCourseName] = useState("");

    const [showDropCourse, setShowDropCourse] = useState(props.show);

    useEffect(() => {

        setShowDropCourse(props.show);

        const getCourseList = async() => {

          try{
          let token = localStorage.getItem("auth-token");
          let getCourseURL = process.env.NODE_ENV === "production"?
                  "https://organelle.pzny.xyz/courses/all":
                  "http://localhost:8080/courses/all";
          let courseRes = await Axios.get(getCourseURL,{headers: {"x-auth-token": token}});/*NOTICE: this may not be correct.*/
          setCourseList(courseRes.data);

          }
          catch(error){
          console.log(error);
        }

        }

        getCourseList();

    },[props.show,courseList])

    function handleClose() {

        return  props.action();
    }

    const DropCourseSubmit = async(e) => {

        e.preventDefault();

        try{

            const courseTag = {courseName: courseName};
            console.log(courseTag);

            const courseURL = process.env.NODE_ENV === "production"?
                "https://organelle.pzny.xyz/courses/"+courseName:
                "http://localhost:8080/courses/"+courseName;
            let token = localStorage.getItem("auth-token");

            const courseRes = await Axios.delete(courseURL,{headers: {"x-auth-token": token}});
            console.log("This is course res:", courseRes);

          } catch (err){
            console.log("This is course res ERR:");
            console.log(err);
          }



        return  props.action();
      }




    return(

        <Modal show={showDropCourse} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Drop the Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupCourse">
                    <Form.Label>Course</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={(e)=>setCourseName(e.target.value)}>
                        <option>Choose...</option>
                        {courseList.map((data,key) =>
                        <option key={key}>{data.courseName}</option>
                    )}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <b>Warning: I know this operation will deletes all events that relevant to this course.</b>
                 </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={DropCourseSubmit}>Drop</Button>
                <Button variant="primary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
