import { createSlice, current, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {instance} from './Utils';



export const revertSubscriptions = createAction('revertSubscriptions');


export const fetchSubscriptions = createAsyncThunk('subscriptions/fetchSubscriptions', async () => {
  let res = await instance.get('/subscriptions/');
  return res.data.data;
});


export const fetchPartialSubscriptions = createAsyncThunk('movies/fetchPartialSubscriptions', async () => {
  let res = await instance.get('/subscriptions/partial/');
  return res.data.data;
});


export const addNewSubscription = createAsyncThunk('subscription/addNewSubscription', async subscription => {
  let res = await instance.post('/subscriptions/', subscription);
  subscription._id = res.data.data;
  return subscription;
});
  

export const updateSubscription = createAsyncThunk('subscription/updateSubscription', async subscription => {
  await instance.put('/subscriptions/' + subscription._id, subscription);
  return subscription;
});


export const deleteSubscription = createAsyncThunk('subscription/deleteSubscription', async _id => {
  await instance.delete('/subscriptions/' + _id);
  return _id;
});


export const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    value: []  
  },
  reducers: {
  }, 
  extraReducers(builder) {
    builder
    .addCase(fetchSubscriptions.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(fetchPartialSubscriptions.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addNewSubscription.fulfilled, (state, action) => {
      state.push(action.payload);
    })    
    .addCase(updateSubscription.fulfilled, (state, action) => {
      let arr = [...current(state)];
      let index = arr.findIndex(x => x._id === action.payload._id);
      if(index >= 0)
      {
        arr[index] = action.payload;
      };
      return arr;
    })
    .addCase(deleteSubscription.fulfilled, (state, action) => {
      return state.filter(value => value._id !== action.payload);
    })    
    .addCase(revertSubscriptions, (state) => {
      return [];
    });
  }
});


export const { } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;