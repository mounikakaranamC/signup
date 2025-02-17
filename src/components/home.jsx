import React from "react";
import { Link } from "react-router-dom";
import { IconMail, IconPhone } from '@tabler/icons-react';

const Home = () => {
    return(
       <>
            <div className="box-container home-container">
                <div className="row-container top-row">
                    <div className="username">
                        <span>Kevin Roger</span>
                    </div>
                    <div className="top-row-btn">
                        <button className="btn">Logout</button>
                    </div>
                </div>
                <div className="row-container bottom-row">
                    <div className="user-info-box">
                        <IconMail />
                        <span>abc@gmail.com</span>
                    </div>
                    <div className="user-info-box">
                        <IconPhone />
                        <span>+99999999999</span>
                    </div>
                </div>
            </div>
 
       </>
    )
}

export default Home;