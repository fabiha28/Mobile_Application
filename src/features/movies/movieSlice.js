import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/MovieApiKey";


export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', async () => {
        const movieText = "Harry";
        const response = await movieApi
            .get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
        return response.data;
    }
);


export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', async () => {
        const seriesText = "FRiends";
        const response = await movieApi
            .get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail',
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    }
);


const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {  // Change "reducer" to "reducers"
        // addMovies: (state, action) => {
        //     state.movies = action.payload;
        // },
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: (state, { payload }) => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, selectMovieOrShow: payload };
        },

    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
