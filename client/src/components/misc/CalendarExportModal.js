/*

export default function CalendarExportModal(props) {
    return (
        <Modal show={showAddEvent} onHide={handleAddEventClose} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Export Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control type="name" placeholder="What is this event?" />
                    </Form.Group>
                    <Form.Group controlId="formGroupCourse">
                        <Form.Label>Course</Form.Label>
                        <Form.Control as="select" defaultValue={courseName} onChange={(e) => setCourseName(e.target.value)}>
                            <option>Choose from Enrolled Courses</option>
                            {courseList.map((data, key) =>
                                <option key={key}>{data.courseName}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Due Time</Form.Label>
                        <Datetime initialValue={moment(props.day)} dateFormat={false} onChange={(e) => onDatePickerChange(e)} />
                    </Form.Group>


                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control type="description" as="textarea" rows={3} placeholder="Any notes for this event?" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" defaultValue="How important is this event?">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </Form.Control>
                    </Form.Group>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={newEventSubmit}>Save</Button>
                <Button variant="primary" onClick={handleAddEventClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

*/