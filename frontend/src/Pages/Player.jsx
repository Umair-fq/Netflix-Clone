import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import  video  from '../assets/video.mp4'
import './CSS/Player.css'
import { useNavigate } from 'react-router-dom'
const Player = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="player-container">
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)}/>
                </div>
                <video src={video} autoPlay loop controls></video>
            </div>
        </div>
    </>
  )
}

export default Player