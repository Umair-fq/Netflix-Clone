import React from 'react';
import './Slider.css';
import CardSlider from '../CardSlider.jsx/CardSlider';

const Slider = ({ movies }) => {
  const getMovies = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div className="slider-container">
      <CardSlider title="Epic Journeys & Unforgettable Adventures" data={getMovies(0, 10)} />
      <CardSlider title="Heartbeats & Heartbreaks: Romantic Tales" data={getMovies(10, 20)} />
      <CardSlider title="Shadows & Suspense: Thriller Nights" data={getMovies(20, 30)} />
      <CardSlider title="Laughter Unleashed: Comedy Classics" data={getMovies(30, 40)} />
      <CardSlider title="Beyond Reality: Sci-Fi & Fantasy" data={getMovies(40, 50)} />
      <CardSlider title="True Stories & Inspirational Lives" data={getMovies(50, 60)} />
    </div>
  );
};

export default Slider;
