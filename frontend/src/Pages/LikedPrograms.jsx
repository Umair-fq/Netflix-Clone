import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './CSS/LikedPrograms.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchMovies, getGenres, getUsersLikedMovies } from '../Store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Components/Utils/firebase-config';
import Navbar from '../Components/Navbar/Navbar';
import Card from '../Components/Card/Card';

const LikedPrograms = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const [isHovered, setIsHovered] = useState(false);
  
      // Moved the onAuthStateChanged listener into useEffect
        onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
          navigate("/login");
        } else {
          setEmail(currentUser.email);
        }
      });
  
      // Cleanup the listener on component unmount
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      if (email) {
        dispatch(getUsersLikedMovies(email));
      }
    }, [email]);

  
  
  return (
    <div>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>My Liked Programs</h1>
            <div className="grid flex">
            {
  movies && movies.length > 0 &&
  movies.map((movie, index) => {
    return (<Card movieData={movie} index={index} key={movie.id}/>)
  })
}

            </div>
        </div>
    </div>
  )
}

export default LikedPrograms