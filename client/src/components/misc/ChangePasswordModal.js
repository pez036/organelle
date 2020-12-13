import React,{ useState, useEffect} from 'react';
import "../layout/todoList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import ErrorNotice from './ErrorNotice';
import "react-datetime/css/react-datetime.css";


export default function AddEventModal(props){

    const [showAddEvent, setShowAddEvent] = useState(props.show);
    const [error, setError] = useState();
    const [curPass, setcurPass] = useState();
    const [newPass, setnewPass] = useState();
    const [newPassConfirm, setnewPassConfirm] = useState();

    useEffect(() => {
        setShowAddEvent(props.show);
        setError(undefined);
        
    },[props.show,props.day])
    
    const handleVerifyPassword = async(e) => {
        
        e.preventDefault();
        
        try{
            const updateURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/updatepassword":
            "http://localhost:8080/users/updatepassword";
            const body = {
                currpass: curPass,
                newpass: newPass,
                confirmpass: newPassConfirm
            };
            const token = localStorage.getItem("auth-token");
            await Axios.put(updateURL,body, {headers: {"x-auth-token": token}})
            .then((res) => {
                setcurPass(undefined);
                setnewPass(undefined);
                setnewPassConfirm(undefined);
                window.alert(res.data.msg);
            });
            return props.action();
            
        } catch (err){
            setError(err.response.data.msg);
        }
    }
    
    function handleClose() {
        return props.action();
    }

    return(

        <Modal show={showAddEvent} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
            <Form>

                <Form.Group controlId="current-pass">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> {setcurPass(e.target.value)}}/>
                </Form.Group>
                
                <Form.Group controlId="new-pass">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> {setnewPass(e.target.value)}}/>
                </Form.Group>
                
                <Form.Group controlId="confirm-pass">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> {setnewPassConfirm(e.target.value)}}/>
                </Form.Group>
                

            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleVerifyPassword}>Save</Button>
                <Button variant="primary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
