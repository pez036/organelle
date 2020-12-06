//import Axios from 'axios';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NaviBar from '../layout/NaviBar';
import Axios from "axios";
import "./Profile.css"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "../layout/Header";

class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email : "dummy@email.com",
            inputEmail: "dummy@email.com",
            notificationSetting: false,
            autoSyncSetting: false,
            inputPassword: ""
        }
        this.handleImportCanvas = this.handleImportCanvas.bind(this);
        this.handleAutoSyncSetting = this.handleAutoSyncSetting.bind(this);
        this.handleEmailSetting = this.handleEmailSetting.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    componentDidMount() {
        let token = localStorage.getItem("auth-token");
        Axios.get("http://localhost:8080/users/setting",{headers: {"x-auth-token": token}})
        .then(res => {
            this.setState({inputEmail: res.data.email});
            this.setState({email: res.data.email});
            this.setState({autoSyncSetting: res.data.autoSyncSetting});
            this.setState({notificationSetting: res.data.emailSetting});
        });
    }

    handleAutoSyncSetting(checked) {
        this.setState({ autoSyncSetting: checked });
        const updateURL = "http://localhost:8080/users/updatesyncsetting";
        const body = {autoSyncSetting: checked};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handleEmailSetting(checked) {
        this.setState({ notificationSetting: checked });
        const updateURL = "http://localhost:8080/users/updateemailsetting";
        const body = {emailSetting: checked};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handleEmailChange(e) {
        this.setState({email: this.state.inputEmail});
        const updateURL = "http://localhost:8080/users/updateemail";
        const body = {email: this.state.inputEmail};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handlePasswordChange() {
        const updateURL = "http://localhost:8080/users/updatepassword";
        const body = {password: this.state.inputPassword};
        const token = localStorage.getItem("auth-token");
        Axios.put(updateURL,body, {headers: {"x-auth-token": token}});
    }

    handleImportCanvas() {
        const token = "13171~cvR5q31Pa3SShRqoR0NXsXC8uSntxCaHARMQ2jleR9v3BJFEO9mGe1V8PARLg4CF";
        const config = {
            headers: { Authorization: `Bearer':${token}`}
        };
        console.log(config);
        const proxyServer = "https://cors-anywhere.herokuapp.com/";
        const canvasRes = Axios.get(proxyServer+"https://canvas.ucsd.edu/api/v1/calendar_events", config );
        console.log(canvasRes);
    }

    render(){
        const { email, notificationSetting, autoSyncSetting } = this.state;
        return (
            <div>
                {/* <Header/> */}
                <div>
                    <NaviBar />
                    <div className = "top-right">
                        <div className = "profile-form">
                            <h4 className = "profile-title">Profile and Settings</h4>
                            <div className="profile-body">
                                <p>Welcome, {email}</p>
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
                                <p>Notification Setting: {notificationSetting} </p>
                                <BootstrapSwitchButton
                                    checked={notificationSetting}
                                    onlabel='on'
                                    onstyle='success'
                                    offlabel='off'
                                    offstyle='danger'
                                    onChange={(checked) => this.handleEmailSetting(checked)}
                                />
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