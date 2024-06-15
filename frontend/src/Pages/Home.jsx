import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Hero from '../Components/Hero/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../Store/store';
import Slider from '../Components/Slider/Slider';

const Home = () => {
  // state for handling user scrolling document
  const [isScrolled, setIsScrolled] = useState(false);
  // whenever the document is scrolled, following functino is invoked
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies)
  useEffect(() => {

    dispatch(getGenres());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])


  const genresSelected = useSelector((state) => state.netflix.genresLoaded)
  useEffect(() => {
    if(genresSelected) {
      dispatch(fetchMovies({type: "all"}));
    }
  })
  return (
    <>
      <Navbar isScrolled = {isScrolled} />
      <Hero />
      <Slider movies = {movies}/>
    </>
  )
}

export default Home