import React,{useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";

export default function AddCourseModal(props){


    const [title, setCourseTitle] = useState("");
    const [professor, setProfessor] = useState("");
    //const [description, setCourseDescription] = useState("");

    const [showAddCourse, setShowAddCourse] = useState(props.show);
    useEffect(() => {
        setShowAddCourse(props.show);
    },[props.show])

    function handleClose() {
        return  props.action();
    }
    const newCourseSubmit = async(e) => {

        e.preventDefault();

        try{

            const courseTag = {courseName: title, professor: professor};
            console.log(courseTag);

            const courseURL = "http://localhost:8080/courses/add";
            let token = localStorage.getItem("auth-token");

            const courseRes = await Axios.post(courseURL,courseTag,{headers: {"x-auth-token": token}});
            console.log("This is course res:", courseRes);

          } catch (err){
            console.log("This is course res ERR:");
            console.log(err);
          }


        return  props.action();
      }

    return(
        <Modal show={showAddCourse} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control type="name" placeholder="What is this course name? e.g.CSE110" onChange={(e)=>setCourseTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupProfessor">
                    <Form.Label>Professor</Form.Label>
                    <Form.Control type="course" placeholder="Who is the professor of this course?" onChange={(e)=>setProfessor(e.target.value)}/>
                </Form.Group>

                {/* <Form.Group controlId="formGroupDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this course?" onChange={(e)=>setCourseDescription(e.target.value)}/>
                </Form.Group> */}

            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newCourseSubmit}>Save</Button>
                <Button variant="primary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
