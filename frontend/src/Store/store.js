import axios from 'axios';
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY, TMDB_URL } from '../Components/Utils/constants';

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk('netflix/genres', async () => {
    const { data } = await axios.get(`${TMDB_URL}/genre/movie/list?api_key=${API_KEY}`);
    return data.genres;
});

const createArray = (results, moviesArray, genres) => {
    results.forEach((movie) => {
        let movieGenres = movie.genre_ids.map((id) => {
            const genre = genres.find((genre) => genre.id === id);
            return genre ? genre.name : 'Unknown'; // Fallback to 'Unknown' if genre is not found
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3), // Only take up to the first 3 genres
            });
        }
    });
};

export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:8080/api/user/getLikedPrograms/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "netflix/delete",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:8080/api/user/delete", {
        email,
        movieId,
      });
      return movies;
    }
  );
// fetch movies by genre
export const fetchMoviesByGenre = createAsyncThunk('netflix/moviesByGenres',
    async ({genre, type }, thunkApi) => {
        const { netflix: { genres } } = thunkApi.getState();
        return getRawData(
            `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            genres
          );
    }
);


const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    // Start index from 1 as API pagination usually starts from page 1
    for (let index = 1; index <= 10 && moviesArray.length < 60; index++) {
        const { data } = await axios.get(`${api}${paging ? `&page=${index}` : ''}`);
        createArray(data.results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk('netflix/trending',
    async ({ type }, thunkApi) => {
        const { netflix: { genres } } = thunkApi.getState();
        const data = await getRawData(`${TMDB_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
        // console.log(data);
        return data; // Now returning data for further processing or updating the state
    }
);

// Add this thunk to handle search
export const searchMovies = createAsyncThunk('netflix/searchMovies',
    async (query, thunkApi) => {
        const { netflix: { genres } } = thunkApi.getState();
        const data = await getRawData(`${TMDB_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, genres, false);
        return data; // returns the search results
    }
);



const NetflixSlice = createSlice({
    name: 'Netflix',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
          });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
          });
          builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});
