import React from 'react'
import Typical from 'react-typical'
import "./profile.css"
export default function profile() {
    return (
        <div className='profile-container'>
            <div className='profile-parent'>
                <div className='profile-details'>
                    <div className='colz'>
                        <div className='colz-icon'>
                            <a href='#'><i className='fa fa-facebook-square'></i></a>
                            <a href='#'><i className='fa fa-google-plus-square'></i></a>
                            <a href='#'><i className='fa fa-instagram'></i></a>
                            <a href='#'><i className='fa fa-linkedin'></i></a>
                            <a href='#'><i className='fa fa-github'></i></a>
                        </div>
                    </div>
                    <div className='profile-details-name'>
                        <span className='primary-text'>
                            {" "}
                            Hello, I´M <span className='highlighted-text'>Cristian</span>
                        </span>
                    </div>
                    <div className='profile-details-role'>
                        <span className='primary-text'>
                            {" "}
                            <h1>
                                {" "}
                                <Typical
                                    loop={Infinity}
                                    steps={[
                                        "Ethusiastic Dev 🌐",
                                        1000,
                                        "Full Stack Developer 💻",
                                        1000,
                                        "Java Developer ☕",
                                        1000,
                                    ]}
                                />
                            </h1>
                            <span className='profile-role-tagline'>
                                Knack of building applications with front and back end operations
                            </span>
                        </span>
                    </div>
                    <div className='profile-options'>
                        {""}
                        <button className='btn primary-btn'>Hire Me {" "}</button>
                        <a href='CV.pdf' download="Kerps Cristian CV.pdf">
                            <button className='btn highlighted-btn'>
                                Get Resume
                            </button>
                        </a>
                    </div>
                </div>
                <div className='profile-picture'>
                    <div className='profile-picture-background'>

                    </div>
                </div>
            </div>
        </div>
    )
}
