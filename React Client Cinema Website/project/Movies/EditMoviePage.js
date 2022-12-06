import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateMovie } from '../Reducers/MovieSlice';


// Edit movie details page

function EditMoviePageComp() {

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movieSelector = useSelector(state => state.movies);

  const [movie, setMovie] = useState({});


  const updateMovieAndReturn = () => {
    dispatch(updateMovie(movie))
    navigate('/movies');
  };


  // Check user has permission to update movies
  useEffect(() => {
    if (!sessionStorage.getItem('permissions').includes("Update Movies")) {
      navigate('/movies');
    };
    if (movieSelector && movieSelector.length > 0) {
      let tempMovie = movieSelector.filter(movie => movie._id === params.id);
      setMovie(tempMovie[0]);
    };
  }, [movieSelector]);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Edit Movie {movie.name}</h2>
      {'Name: '}
      <input type="text" value={movie.name} onChange={e => setMovie({...movie, name: e.target.value})} /> <br/> 
      {'Genres: '}
      <input type="text" value={Object.keys(movie).length > 0 && movie.genres.join(', ')} onChange={e => setMovie({...movie, genres: e.target.value.split(', ')})} /> <br/>
      {'Image URL: '}
      <input type="text" value={movie.image} onChange={e => setMovie({...movie, image: e.target.value})} /> <br/>
      {'Premiered: '}
      <input type="text" value={movie.premiered} onChange={e => setMovie({...movie, premiered: e.target.value})} /> <br/><br/>
      <input type="button" value="Save" onClick={() => updateMovieAndReturn()} />
      <input type="button" value="Cancel" onClick={() => navigate('/movies')} /> <br/><br/>
    </div>
  );
};

export default EditMoviePageComp;
