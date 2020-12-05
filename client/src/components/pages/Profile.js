//import Axios from 'axios';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NaviBar from '../layout/NaviBar';
import "./Profile.css"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "../layout/Header";

class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "dummy@email.com",
            notificationSetting: false,
            autoSyncSetting: false,
            inputpassword: ""
        }

        //Request and load user profile and settings from server into state for later display
        //Axios.get();
        //this.setState({email, notificationSetting, autoSyncSetting});
    }

    render(){
        const { email, notificationSetting, autoSyncSetting } = this.state;
        return (
            <div>
                <Header/>
                <div>
                    <NaviBar />
                    <div className = "top-right">
                        <div className = "profile-form">
                            <h4 className = "profile-title">Profile and Settings</h4>
                            <div className="profile-body">
                                <p>Welcome, {email}</p>
                                <p>Change your email</p>
                                <input type="email" onChange={(e)=>{
                                    this.setState({email: e.target.value})}}
                                />
                                <br/>
                                <Button viriant="light">change</Button>
                                <p>Change your password</p>
                                <input type="password" onChange={(e)=>{
                                    this.setState({inputPassword: e.target.value})}}
                                />
                                <br/>
                                <Button viriant="light">change</Button>
                                <p>Notification Setting: {notificationSetting} </p>
                                <BootstrapSwitchButton
                                    checked={notificationSetting}
                                    onlabel='on'
                                    onstyle='success'
                                    offlabel='off'
                                    offstyle='danger'
                                    onChange={(checked) => {
                                        this.setState({ notificationSetting: checked })
                                    }}
                                />
                                <p>Canvas AutoSync Setting: {autoSyncSetting} </p>
                                <BootstrapSwitchButton
                                    checked={autoSyncSetting}
                                    onlabel='on'
                                    onstyle='success'
                                    offlabel='off'
                                    offstyle='danger'
                                    onChange={(checked) => {
                                        this.setState({ autoSyncSetting: checked })
                                    }}
                                />
                                <p>Get events from Canvas</p>
                                <Button>Import</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
export default Profile;