import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Reducers/UserSlice';
import movieSlice from './Reducers/MovieSlice';
import subscriptionSlice from './Reducers/SubscriptionSlice';
import memberSlice from './Reducers/MemberSlice';


export default configureStore({
  reducer: {
    users: userSlice,
    subscriptions: subscriptionSlice,
    members: memberSlice,
    movies: movieSlice
  }
});
