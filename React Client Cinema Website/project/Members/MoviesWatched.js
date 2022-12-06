import { useState } from "react";
import { useSelector } from 'react-redux'
import AddSubscriptionComp from "./AddSubscription";
import {Link} from 'react-router-dom';


// Show movies a member is subscribed to component

function MoviesWatchedComp(props) {

  const movieSelector = useSelector(state => state.movies);
  const subSelector = useSelector(state => state.subscriptions);
  
  const [showAddSubscriptions, setShowAddSubscription] = useState(false);


  return (
    <div className="App" style={ {left: "50%", transform: "translateX(-50%)", width: "350px", border: "solid", position: "relative" } }>
      { subSelector && subSelector.length > 0 &&
        <div>
          {
            subSelector.filter(sub => sub.member_id === props.propsData).length > 0 &&
            <div>
              <h4>Movies Watched</h4>
              {
                movieSelector && movieSelector.length > 0 && subSelector.filter(sub => sub.member_id === props.propsData)[0].movies.map(subMovie => {
                let movieDetails = movieSelector.filter(movie => movie._id == subMovie.movie_id)[0]
                return <li key={movieDetails._id}> <Link to={"/movie/" + movieDetails._id}>{movieDetails.name}</Link>, {subMovie.date} </li>
                })
              }
              <br/>
            </div>
          }
          {
            subSelector.filter(sub => sub.member_id === props.propsData).length === 0 &&
            <h4>Hasn't Watched any Movie Yet</h4>
          }
          {
            sessionStorage.getItem('permissions').includes('Update Members') &&
            <div>
              <input type="button" value="Add Subscription to Movie" onClick={() => setShowAddSubscription(true)} /><br/><br/>
              {
                showAddSubscriptions && 
                <div>
                  <AddSubscriptionComp propsData={props.propsData} callBack={() => setShowAddSubscription(false)} /> 
                  <br/>
                </div>
              }
            </div>
          }

        </div>
      }
    </div>
  );
};

export default MoviesWatchedComp;
