import { createSlice, current, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {instance} from './Utils';



export const revertMovies = createAction('revertMovies');


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  let res = await instance.get('/movies/');
  return res.data.data;
});


export const fetchMoviesNames = createAsyncThunk('movies/fetchMoviesNames', async () => {
  let res = await instance.get('/movies/names/');
  return res.data.data;
});


export const addNewMovie = createAsyncThunk('movie/addNewMovie', async movie => {
  let res = await instance.post('/movies/', movie);
  movie._id = res.data.data;
  return movie;
});


export const updateMovie = createAsyncThunk('movie/updateMovie', async movie => {
  await instance.put('/movies/' + movie._id, movie);
  return movie;
});


export const deleteMovie = createAsyncThunk('movie/deleteMovie', async _id => {
  await instance.delete('/movies/' + _id);
  return _id;
});


export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    value: []
  },
  reducers: {
  }, 
  extraReducers(builder) {
    builder
    .addCase(fetchMovies.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(fetchMoviesNames.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addNewMovie.fulfilled, (state, action) => {
      state.push(action.payload);
    })    
    .addCase(updateMovie.fulfilled, (state, action) => {
      let arr = [...current(state)];
      let index = arr.findIndex(x => x._id === action.payload._id);
      if(index >= 0)
      {
          arr[index] = action.payload;
      };
      return arr;     
    })
    .addCase(deleteMovie.fulfilled, (state, action) => {
      return state.filter(value => value._id !== action.payload);
    })    
    .addCase(revertMovies, (state) => {
      return [];
    })   
  }
});


export const { } = movieSlice.actions;

export default movieSlice.reducer;