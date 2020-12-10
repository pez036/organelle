import React from 'react';
import Welcome from "../layout/Welcome";
import calImg from "../../images/calendar.png";
import todoImg from "../../images/todo.png";
import canvasImg from "../../images/canvasT.png";
import "./home.css";

export default function Home() {
return (
    <div className="homePage">
        <Welcome />
        <section className="features">

                <h1>Calendar</h1>
                <div className="f1grid">
                    <img height="250" width="450" src={calImg} alt="feature 1"/>
                    <p class="vertical">Get an overview of upcoming lectures and deadlines for the month using the Calendar view. You can add events individually, upload your own .ics calendar file, or import from Canvas. Organelle allows you to easily navigate your personal study plan by keeping you up to date on your tasks for the month.

                    </p>
                </div>
                <hr/>
                <h1>Canvas Compatibility</h1>
                <div className="f2grid">
                    <img height="200" width="450" src={canvasImg} alt="feature 2"/>
                    <p class="vertical">Already have important events on your Canvas calendar? Organelle saves you the hassle of manually uploading each event with its Import from Canvas capability. This allows you to include every event on your personal Canvas calendar on your Organelle account.

                    </p>
                </div>
                <hr/>
                <h1>To Do List</h1>
                <div className="f2grid">
                    <img height="230" width="450" src={todoImg} alt="feature 2"/>
                    <p class="vertical">Break up the monotony of working from home with the To Do List view. With your upcoming deadlines organized into daily to do lists sorted by your personalized priority, Organelle helps you get a clear grasp of what you will be doing each day. Check off tasks as you go to monitor your progress.

                    </p>
                </div>


        </section>
        <section className="story">
            <h2>Our Story</h2>
            <p>
                With the new normal of online learning, the modern student must juggle different class websites, emails, and syllabi in order to navigate their courses. Organelle�s flexibility allows students to create a personalized homepage of deadlines and events, allowing students to organize their planner to their needs. We strive to help students succeed in their online classes by giving them the tools to stay on top of their learning.
            </p>
        </section>
        <section className="experience">

        </section>
        <footer>
            Organelle. &copy; All rights reserved.
        </footer>
    </div>
);
}