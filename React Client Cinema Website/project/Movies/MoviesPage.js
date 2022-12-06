import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import AddMoviePageComp from "./AddMoviePage";
import AllMoviesComp from "./AllMovies";


// The global page for movies department

function MoviesPageComp() {
  
  const params = useParams();

  const navigate = useNavigate();
  
  const [showMovies, setShowMovies] = useState(true);

  
  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Manage Movies</h2>
      <input type="button" value="Menu" onClick={() => navigate("/menu")} />
      <input type="button" value="All Movies" onClick={() => setShowMovies(true)} />
      {
        sessionStorage.getItem('permissions').includes('Create Movies') &&
        <input type="button" value="Add Movie" onClick={() => setShowMovies(false)} />
      }
      <br/><br/>
      {
        showMovies && <AllMoviesComp propsData={params}/>
      }
      {
        !showMovies && <AddMoviePageComp callBack={() => setShowMovies(true)}/>
      }
    <br/>
    <input type="button" value="Back to Top" onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} />
    <br/><br/>
    </div>
  );
};

export default MoviesPageComp;
