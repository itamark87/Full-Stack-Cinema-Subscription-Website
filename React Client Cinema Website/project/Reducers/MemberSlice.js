import { createSlice, current, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {instance} from './Utils';



export const revertMembers = createAction('revertMembers');
  

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  let res = await instance.get('/members/');
  return res.data.data;
});


export const addNewMember = createAsyncThunk('member/addNewMember', async member => {
  let res = await instance.post('/members/', member);
  member._id = res.data.data;
  return member;
});


export const updateMember = createAsyncThunk('member/updateMember', async member => {
  await instance.put('/members/' + member._id, member);
  return member;
});


export const deleteMember = createAsyncThunk('member/deleteMember', async _id => {
  await instance.delete('/members/' + _id);
  return _id;
});


export const memberSlice = createSlice({
  name: 'members',
  initialState: {
    value: []
  },
  reducers: {
  }, 
  extraReducers(builder) {
    builder
    .addCase(fetchMembers.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addNewMember.fulfilled, (state, action) => {
      state.push(action.payload);
    })    
    .addCase(updateMember.fulfilled, (state, action) => {
      let arr = [...current(state)];
      let index = arr.findIndex(x => x._id === action.payload._id);
      if(index >= 0)
      {
          arr[index] = action.payload;
      };
      return arr;      
    })
    .addCase(deleteMember.fulfilled, (state, action) => {
      return state.filter(value => value._id !== action.payload);
    })    
    .addCase(revertMembers, (state) => {
      return [];
    });  
  }
});


export const { } = memberSlice.actions;

export default memberSlice.reducer;