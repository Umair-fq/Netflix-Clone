import React from 'react';
import './GenreSelection.css';
import { useDispatch } from 'react-redux';
import { fetchMoviesByGenre } from '../../Store/store';

const GenreSelection = ({ genres, type }) => {
    const dispatch = useDispatch();
    return (
        <div className="genre-selection-wrapper">
            <select className="genre-selection" onChange={(e) => {
                dispatch(
                  fetchMoviesByGenre({
                    genres,
                    genre: e.target.value,
                    type,
                  })
                );
              }}>
                <option value="">Select Genre</option> {/* Optional placeholder */}
                {genres.map(genre => (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreSelection;
