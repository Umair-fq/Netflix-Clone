import React, { useState, useEffect } from 'react';
import './Card.css';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BsInfoCircleFill } from 'react-icons/bs';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeMovieFromLiked } from '../../Store/store';

const Card = ({ movieData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Moved the onAuthStateChanged listener into useEffect
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setEmail(currentUser.email);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [navigate]); // Adding navigate as a dependency to re-run if navigate changes

  const likedMovies = async (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements
    if (!email) {
      alert("Please log in to like movies."); // Or handle this more gracefully
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/user/likeprogram", { email, data: movieData });
      console.log("Hello"); // For debugging

      // Maybe update UI to reflect the movie has been liked
    } catch (error) {
      console.error(error);
      // Notify the user of the error
    }
  };

  return (
    <div
      className={`card-container ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} />
      {isHovered && (
        <div className="card-overlay">
          <video src={movieData.video} autoPlay loop muted className="video-preview"></video>
          <div className="card-info">
            <div className="card-controls">
              <IoPlayCircleSharp className="control-icon play" />
              <RiThumbUpFill className="control-icon" onClick={likedMovies} />
              <RiThumbDownFill className="control-icon" onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }/>
              <BsInfoCircleFill className="control-icon" />
            </div>
            <div className="card-description">
              <h3 className="card-title">{movieData.name}</h3>
              <div className="card-genres">
                {movieData.genres.map((genre, index) => (
                  <span key={index} className="genre">{genre}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
