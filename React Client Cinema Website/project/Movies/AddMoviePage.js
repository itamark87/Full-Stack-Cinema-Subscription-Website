import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addNewMovie } from '../Reducers/MovieSlice';


// Add a new movie page

function AddMoviePageComp(props) {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const [movie, setMovie] = useState({name: '', genres: [], image: '', premiered: ''});


  const addMovieAndReturn = () => {
    dispatch(addNewMovie(movie));
    props.callBack();
  };


  // Check user has permission to create new movies
  useEffect(() => {
    if (!sessionStorage.getItem('permissions').includes('Create Movies')) {
      navigate('/movies');
    };
  }, []);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Add New Movie</h2>
      {'Name: '}
      <input type="text" onChange={e => setMovie({...movie, name: e.target.value})} /> <br/> 
      {'Genres: '}
      <input type="text" onChange={e => setMovie({...movie, genres: e.target.value.split(', ')})} /> <br/>
      {'Image URL: '}
      <input type="text" onChange={e => setMovie({...movie, image: e.target.value})} /> <br/>
      {'Premiered: '}
      <input type="text" onChange={e => setMovie({...movie, premiered: e.target.value})} /> <br/><br/>
      <input type="button" value="Save" onClick={() => addMovieAndReturn()} />
      <input type="button" value="Cancel" onClick={() => props.callBack()} /> <br/><br/>
    </div>
  );
};

export default AddMoviePageComp;
