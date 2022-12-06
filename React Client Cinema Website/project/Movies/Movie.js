import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MovieSubsPageComp from "./MovieSubsPage";
import { deleteMovie } from '../Reducers/MovieSlice';
import { deleteSubscription, updateSubscription } from "../Reducers/SubscriptionSlice";
import { v4 as uuidv4 } from 'uuid';


// Individual movie component

function MovieComp(props) {
  
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  const subSelector = useSelector(state => state.subscriptions);
  const memberSelector = useSelector(state => state.members);
  
  const [movieSubs, setMovieSubs] = useState([]);


  // Delete a movie and all subscriptions related to it
  const deleteMovieAndReturn = () => {
    if (!subSelector) {
      alert("Cannot apply action because data was not loaded properly");
      return;
    }
    dispatch(deleteMovie(props.propsData._id));
    subSelector.forEach(sub => {
      let new_movies = sub.movies.filter(movie => movie.movie_id !== props.propsData._id);
      if (new_movies.length === 0) {
        dispatch(deleteSubscription(sub._id));
      } else if (new_movies.length !== sub.movies.length) {
        let new_sub = {_id: sub._id, member_id: sub.member_id, movies: new_movies};
        dispatch(updateSubscription(new_sub));
      }});
    props.callBack();
  };


  // Find subscriptions related to this movie
  const findSubscriptions = () => {
    if (subSelector && subSelector.length > 0) {
      let movieSubsTemp = [];
      subSelector.forEach(sub => {
        sub.movies.forEach(movie => {
          if (movie.movie_id === props.propsData._id) {
            let obj = {};
            obj.member_id = sub.member_id;
            obj.date = movie.date;
            let member_arr = memberSelector.filter(member => member._id===sub.member_id);
            let member = member_arr[0];
            obj.name = member.name;
            movieSubsTemp.push(obj);
          };
        });
      });
      setMovieSubs(movieSubsTemp);
    };
  };
  

  // If a user has the permission to view members, fetch subscriptions relevant to this movie
  useEffect(() => {
    if (props.perms.includes('View Members')) {
      findSubscriptions();
    };
  }, [subSelector]);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h3>{props.propsData.name}{props.perms.includes("View Movies") && ", "} {props.propsData.premiered && props.propsData.premiered.slice(0,4)}</h3>
      {   
        props.propsData.genres && 
        <div> 
          {'Genres: ' + props.propsData.genres.join(", ")} 
          <br/><br/>
        </div>  
      }
      {   
        props.propsData.image && 
        <div>
          <img id='img' src={props.propsData.image} onError={(e) => e.target.style.display = 'none'} />
          <br/><br/> 
        </div>  
      }
      {
        movieSubs.length > 0 && 
        <div>
          <MovieSubsPageComp key={uuidv4()} propsData={movieSubs} /> 
          <br/>
        </div>
      }
      {
        props.perms.includes('Update Movies') &&
        <input type="button" value="Edit" onClick={() => navigate('/movie/edit/' + props.propsData._id)} />
      }
      {
        props.perms.includes('Delete Movies') && 
        <input type="button" value="Delete" onClick={() => deleteMovieAndReturn()} />
      }
      {
        (props.perms.includes('Update Movies') || props.perms.includes('Delete Movies')) && 
        <div>
          <br/>
        </div> 
      }
    </div>
  );
};

export default MovieComp;
