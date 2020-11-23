//import Axios from 'axios';
import React, {Component} from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NaviBar from '../layout/NaviBar';
import "./Profile.css"

class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "dummy@email.com",
            notificationSetting: false,
            autoSyncSetting: false
        }

        //Request and load user profile and settings from server into state for later display
        //Axios.get();
        //this.setState({email, notificationSetting, autoSyncSetting});
    }

    render(){
        const { email, notificationSetting, autoSyncSetting } = this.state;
        return (
            <div>
            <NaviBar />
            <div className = "top-right">
                <div className = "profile-form">
                    <h4>Profile and Settings</h4>
                    <form className="profile">
                    <p>your email: {email}</p>
                    <p> Change your email</p>
                    <input type="email" onChange={(e)=>{
                        this.setState({email: e.target.value})}}
                    />
                    <br/>
                    <button variant="light">change</button>
                    <p>Notification Setting: {notificationSetting} </p>
                    <BootstrapSwitchButton
                        checked={notificationSetting}
                        onlabel='on'
                        onstyle='danger'
                        offlabel='off'
                        offstyle='success'
                        onChange={(checked) => {
                            this.setState({ notificationSetting: checked })
                        }}
                    />
                    <p>AutoSync Setting: {autoSyncSetting} </p>
                    <BootstrapSwitchButton
                        checked={autoSyncSetting}
                        onlabel='on'
                        onstyle='danger'
                        offlabel='off'
                        offstyle='success'
                        onChange={(checked) => {
                            this.setState({ autoSyncSetting: checked })
                        }}
                    />
                    </form>
                </div>
            </div>
            </div>
            );
    }
}
export default Profile;