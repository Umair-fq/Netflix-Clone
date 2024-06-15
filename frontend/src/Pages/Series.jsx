import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, getGenres } from '../Store/store';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Components/Utils/firebase-config';
// import './Movies.css';
import Navbar from '../Components/Navbar/Navbar';
import Slider from '../Components/Slider/Slider';
import NotAvailable from '../Components/NotAvailable/NotAvailable';
import GenreSelection from '../Components/GenreSelection/GenreSelection';

const Series = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    dispatch(getGenres());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  useEffect(() => {
    if (genres) {
      dispatch(fetchMovies({ type: 'tv' }));
    }
  }, [dispatch, genres]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });



  return (
    <div className="nvabar">
        <Navbar isScrolled={ isScrolled }/>
        <GenreSelection genres={genres} type="tv"/>
        <div className="data">
            {movies.length ? <Slider movies={movies}/> : 
                <NotAvailable />}
        </div>
    </div>
  );
};

export default Series;
