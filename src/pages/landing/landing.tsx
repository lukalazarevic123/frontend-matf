import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './landing.css'

export const LandingPage = () => {

    return (
        <Container>

            <div className="landing-page">
                <h2>Online Platform For Learning  How To Code And Debug</h2>

                <div id="ourmission">
                    <h4>Our Mission</h4>
                    <h3>Our goal is to teach students how to code by playing a fun and interactive game
                        and more importantly they get the chance to learn how to debug by finding errors
                        in the given code.</h3>
                </div>

                <button id="landingBtn">Get started</button>
                
            </div>
        </Container>

    );
}
