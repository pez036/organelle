import React from 'react';
import Welcome from "../layout/Welcome";
import img from "../../images/bg.png";
import "./home.css";

export default function Home() {
return (
    <div className="homePage">
        <Welcome />
        <section className="features">

                <h2>Feature #1</h2>
                <div className="f1grid">
                    <img height="280" width="300" src={img} alt="feature 1"/>
                    <p>Itaque est enim. Qui quia asperiores expedita consequatur. Fugit officiis culpa rerum nihil ea. Repellat nihil sequi perferendis impedit accusamus aperiam et labore. Sequi fugit dolores provident sed voluptas voluptas quas ex illo.

                            Cumque maxime molestias aut et. Ipsam qui iusto quas saepe ut est quos qui et. Temporibus consequatur eos ab est explicabo itaque officiis cum ut. In voluptates distinctio vel. Eos consequuntur doloribus eveniet ut consequatur et eos eveniet.

                            Nihil suscipit dolores et et repudiandae similique. Ut aut neque molestiae officiis ut assumenda aut dolores optio. Dolores voluptas occaecati fugit sed ad numquam blanditiis quidem beatae. Rerum at ut et unde exercitationem qui fugit quas. Ipsum reiciendis quisquam aut quaerat nulla et repudiandae deserunt.
                    </p>
                </div>
                <hr/>
                <h2>Feature #2</h2>
                <div className="f2grid">
                    <img height="270" width="300" src={img} alt="feature 2"/>
                    <p>Itaque est enim. Qui quia asperiores expedita consequatur. Fugit officiis culpa rerum nihil ea. Repellat nihil sequi perferendis impedit accusamus aperiam et labore. Sequi fugit dolores provident sed voluptas voluptas quas ex illo.

                            Cumque maxime molestias aut et. Ipsam qui iusto quas saepe ut est quos qui et. Temporibus consequatur eos ab est explicabo itaque officiis cum ut. In voluptates distinctio vel. Eos consequuntur doloribus eveniet ut consequatur et eos eveniet.

                            Nihil suscipit dolores et et repudiandae similique. Ut aut neque molestiae officiis ut assumenda aut dolores optio. Dolores voluptas occaecati fugit sed ad numquam blanditiis quidem beatae. Rerum at ut et unde exercitationem qui fugit quas. Ipsum reiciendis quisquam aut quaerat nulla et repudiandae deserunt.
                    </p>
                </div>


        </section>
        <section className="story">
            <h2>Our Story</h2>
            <p>
                Error consequatur omnis nulla dolorem odio facere molestias omnis qui. Voluptas et natus vitae totam quia nisi et eos quis. Est consequatur voluptate laudantium aut ut ipsum et. Culpa ullam totam aut voluptatum illo libero. Ab beatae laudantium. Velit doloremque qui.
 
Aut nihil voluptatibus eius ratione. Modi nulla non. Nihil ducimus in. Sed repellat nesciunt aperiam vel et molestias quidem nostrum.
 
Ea ea nam nemo. Odio est nihil deserunt sit dolores eligendi itaque. Rerum consequuntur voluptas officiis. Ad iure eveniet inventore tempora.
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