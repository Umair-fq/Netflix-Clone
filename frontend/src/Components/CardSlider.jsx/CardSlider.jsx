// CardSlider.jsx
import React from 'react';
import './CardSlider.css';
import Card from '../Card/Card';

const CardSlider = ({ title, data }) => {
  return (
    <div className='card-slider-section'>
      <h2 className='card-slider-title'>{title}</h2>
      <div className='card-row'>
          {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id}/>
          })}
      </div>
    </div>
  );
};

export default CardSlider;
