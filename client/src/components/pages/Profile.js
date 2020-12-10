//import Axios from 'axios';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NaviBar from '../layout/NaviBar';
import Axios from "axios";
import "./Profile.css"

class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email : "dummy@email.com",
            inputEmail: "dummy@email.com",
            notificationSetting: false,
            autoSyncSetting: false,
            inputPassword: "",
            canvasToken:""
        }
        this.handleImportCanvas = this.handleImportCanvas.bind(this);
        this.handleAutoSyncSetting = this.handleAutoSyncSetting.bind(this);
        this.handleEmailSetting = this.handleEmailSetting.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.scheduleSend = this.scheduleSend.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem("auth-token");
        const settingURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/setting":
            "http://localhost:8080/users/setting";
        Axios.get(settingURL,{headers: {"x-auth-token": token}})
        .then(res => {
            this.setState({inputEmail: res.data.email});
            this.setState({email: res.data.email});
            this.setState({autoSyncSetting: res.data.autoSyncSetting});
            this.setState({notificationSetting: res.data.emailSetting});
        });
    }

    handleAutoSyncSetting(checked) {
        this.setState({ autoSyncSetting: checked });
        const updateURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/updatesyncsetting":
            "http://localhost:8080/users/updatesyncsetting";

        const body = {autoSyncSetting: checked};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }
    scheduleSend(){
        // e-mail message options

        try{
            const emailURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/events/emailstart":
            "http://localhost:8080/events/emailstart";

            const token = localStorage.getItem("auth-token");
            console.log(this.state.email);
            const body = {"email":this.state.email};
            Axios.post(emailURL,body, {headers: {"x-auth-token": token}});
            window.alert("Email sent successfully.");
            
        } catch(err){
            console.log("SCHE ERR");
            console.log(err);
        }
    }

    handleEmailSetting(checked) {
        this.setState({ notificationSetting: checked });
        const updateURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/updateemailsetting":
            "http://localhost:8080/users/updateemailsetting";
        const body = {emailSetting: checked};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handleEmailChange(e) {
        this.setState({email: this.state.inputEmail});
        const updateURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/updateemail":
            "http://localhost:8080/users/updateemail";
        const body = {email: this.state.inputEmail};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handlePasswordChange() {
        const updateURL = process.env.NODE_ENV === "production"?
            "http://organelle.pzny.xyz/users/updatepassword":
            "http://localhost:8080/users/updatepassword";
        const body = {password: this.state.inputPassword};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handleImportCanvas() {
        //this token is valid until Dec.8th 12am, belonging to Pengyu Zhang's Canvas account
        const token = this.state.canvasToken;
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        };
        console.log(config);
        const proxyServer = "https://cors-anywhere.herokuapp.com/";
        Axios.get(proxyServer+"https://canvas.ucsd.edu/api/v1/calendar_events", config )
        .then((res) => {
            let token = localStorage.getItem("auth-token");
            res.data.forEach((element) => {
                const title = element.title;
                const type = element.type;
                const startTime = element.start_at;
                const endTime = element.end_at;
                const priority = 1;
                const description = element.description;
                const canvasID = element.id;
                const eventTag = {title: title,
                    type: type, startTime: startTime, endTime: endTime,
                    priority:priority, description: description, canvasID: canvasID};
                console.log(eventTag);
                const addURL = process.env.NODE_ENV === "production"?
                    "http://organelle.pzny.xyz/events/add":
                    "http://localhost:8080/events/add";
                Axios.post(addURL, eventTag, {headers: {"x-auth-token": token}});
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        window.alert("Imported from you Canvas calendar successfully!");
    }

    render(){
        const { email, notificationSetting, autoSyncSetting } = this.state;
        return (
            <div>
                <div>
                    <NaviBar />
                    <div className = "top-right">
                        <div className = "profile-form">
                            <h4 className = "profile-title">Profile and Settings</h4>
                            <div className="profile-body">
                                <h4>Welcome, {email}</h4>
                                <p>Change your email</p>
                                <input className="change-setting" type="email" onChange={(e)=>{
                                    this.setState({inputEmail: e.target.value})
                                }}
                                />
                                <br/>
                                <Button viriant="light" onClick={this.handleEmailChange}>change</Button>
                              
                                <p>Change your password</p>
                                <input className="change-setting" type="password" onChange={(e)=>{
                                    this.setState({inputPassword: e.target.value})}}
                                />
                                <br/>
                                <Button viriant="light" onClick={this.handlePasswordChange}>change</Button>
                                <p>Notification Email (Events for the next three days): {notificationSetting} </p>
                                <Button onClick={this.scheduleSend}>Send Email</Button>
                                <p>Canvas AutoSync Setting: {autoSyncSetting} </p>
                                <BootstrapSwitchButton
                                    checked={autoSyncSetting}
                                    onlabel='on'
                                    onstyle='success'
                                    offlabel='off'
                                    offstyle='danger'
                                    onChange={(checked) =>this.handleAutoSyncSetting(checked)}
                                />
                                <p>Get events from Canvas</p>
                                <input className="change-setting" type="password" placeholder="Canvas token here"
                                    onChange={(e)=>{
                                    this.setState({canvasToken: e.target.value})}}
                                />
                                <p/>
                                <Button onClick={this.handleImportCanvas}>Import</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
export default Profile;