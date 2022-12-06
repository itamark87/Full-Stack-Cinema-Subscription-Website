import { createSlice, current, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {instance} from './Utils';



export const revertUsers = createAction('revertUsers');


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  let res = await instance.get('/users/');
  return res.data.data;
});


export const addNewUser = createAsyncThunk('user/addNewUser', async user => {
  let res = await instance.post('/users/', user);
  user._id = res.data.data;
  return user;
});


export const updateUser = createAsyncThunk('user/updateUser', async user => {
  await instance.put('/users/' + user._id, user);
  return user;
});


export const deleteUser = createAsyncThunk('user/deleteUser', async _id => {
  await instance.delete('/users/' + _id);
  return _id;
});


export const userSlice = createSlice({
  name: 'users',
  initialState: {
    value: []
  },
  reducers: {
  }, 
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addNewUser.fulfilled, (state, action) => {
      state.push(action.payload);
    })    
    .addCase(updateUser.fulfilled, (state, action) => {
      let arr = [...current(state)];
      let index = arr.findIndex(x => x._id === action.payload._id);
      if(index >= 0)
      {
          arr[index] = action.payload;
      }
      return arr;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      return state.filter(value => value._id !== action.payload);
    })
    .addCase(revertUsers, (state) => {
      return [];
    });
  }
});


export const { } = userSlice.actions;

export default userSlice.reducer;