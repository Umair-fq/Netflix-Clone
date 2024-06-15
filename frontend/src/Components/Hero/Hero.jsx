import React from 'react';
import './Hero.css';
import bgImage from '../../assets/hero.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className="hero">
        <img src={bgImage} alt="Background" className='bg-img'/>
        <div className="container">
            <div className="buttons flex j-center a-center">
                <button className="button flex j-center a-center" onClick={() => {navigate('/player')}}>
                    <FontAwesomeIcon icon={faPlay} />
                    <span>Play</span>
                </button>
                <button className="button flex j-center a-center">
                    <AiOutlineInfoCircle size={22} />
                    <span>More Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Hero;
