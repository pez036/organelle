import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Axios from 'axios';

export default function CalendarImportModal(props) {

    const [showModal, setShowModal] = useState(props.show);
    const [file, setFileName] = useState("");

    useEffect(() => {
        setShowModal(props.show);
    },[props.show])

    const handleFileInput = (e) => {
        // handle validations
        setFileName(e.target.files[0]);
    };

    function handleClose() {
        return props.action();
    }

    const upload = async (e) => {
        
        let token = localStorage.getItem("auth-token");
        const formData = new FormData();
        formData.append("file", file);
        const URL = process.env.NODE_ENV === "production" ?
        "https://organelle.pzny.xyz/calendar/load" :
        "http://localhost:8080/calendar/load";
        try {
            var res = await Axios.post(URL, formData, { headers: { "x-auth-token": token } });
            console.log(res.data.msg);
            alert(res.data.msg);
        }
        catch (err) {
            alert(err);
        }
    }
    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Upload calendar file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <input type="file" onChange={handleFileInput} />
                    <button
                        className="btn btn-success"
                        onClick={upload}>
                        Upload
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}