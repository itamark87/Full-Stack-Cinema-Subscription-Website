import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNewSubscription, updateSubscription } from '../Reducers/SubscriptionSlice';


// Add a member subscription to a movie component

function AddSubscriptionComp(props) {

  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [movieId, setMovieId] = useState("");

  const movieSelector = useSelector(state => state.movies);
  const subSelector = useSelector(state => state.subscriptions);


  const addSubAndReturn = () => {
    let memberSub = {};
    if (subSelector && subSelector.length > 0) {
      memberSub = subSelector.filter(sub => sub.member_id === props.propsData)[0];
    }
    if (memberSub) {
      let obj = {...memberSub, movies: [...memberSub.movies, {movie_id: movieId, date: date}]};
      dispatch(updateSubscription(obj));
    } else {
      let obj = {};
      obj.member_id = props.propsData;
      obj.movies = [{movie_id: movieId, date: date}];
      dispatch(addNewSubscription(obj));
    }
    props.callBack();
  };


  useEffect(() => {
    if (movieSelector && movieSelector.length > 0) {
      setMovieId(movieSelector[0]._id);
    }
  }, []);


  return (
    <div className="App" style={  {left: "50%", transform: "translateX(-50%)", width: "295px", border: "solid", position: "relative" } }>
      <h4>Add Subscription to Movie</h4>
      Movie: <select onChange={(e) => setMovieId(e.target.value)}>
        {
        movieSelector.map(movie => {
          return <option key={movie._id} value={movie._id}>{movie.name}</option>
        })
        }
      </select>
      <br/>On Date: 
      <input type="text" onChange={e => setDate(e.target.value)} /><br/><br/>
      <input type="button" value="Subscribe" onClick={() => addSubAndReturn()} />
      <input type="button" value="Cancel" onClick={() => props.callBack()} />
      <br/><br/>
    </div>
  );
};

export default AddSubscriptionComp;
