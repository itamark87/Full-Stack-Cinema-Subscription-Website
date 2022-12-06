import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import MovieComp from "./Movie";


// Parent to all individual movie components, providing each with specific movie information via props

function AllMoviesComp(props) {

  const movieSelector = useSelector(state => state.movies);

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  const searchMovie = (val) => {
    setSearchValue(val);
    if (val && movieSelector && movieSelector.length > 0) {
      let filtered_movies = movieSelector.filter(movie => movie.name.toLowerCase().includes(val));
      setMovies(filtered_movies);
    } else {
      setMovies([]);
    };
  };

  // If an ID is given through the URL, find the specific movie with the ID and show it only
  useEffect(() => {
    if ("id" in props.propsData && movieSelector && movieSelector.length > 0) {
      let movie_from_url = movieSelector.filter(movie => movie._id === props.propsData.id);
      if (Object.keys(movie_from_url).length > 0) {
        setMovies(movie_from_url);
        setSearchValue(movie_from_url[0].name);
      } else {
        searchMovie("");
      };
    };
  }, [movieSelector]);


  return (
    <div className="App" style={ {width: "600px"} }>
      {
        sessionStorage.getItem('permissions').includes("View Movies") &&
        <div>
          {'Search: '}
          <input type="text" value={searchValue} onChange={e => searchMovie(e.target.value)} />
          <input type="button" value="X" onClick={() => searchMovie("")} /> <br/> <br/>
        </div>
      }
      {
        movies.length === 0 && movieSelector.length > 0 && movieSelector.map(movie =>
          {
            return <MovieComp propsData={movie} perms={sessionStorage.getItem('permissions')} callBack={() => searchMovie("")} key={movie._id} />
          })
      }
      {
        movies.length > 0 && movies.map(movie =>
          {
            return <MovieComp propsData={movie} perms={sessionStorage.getItem('permissions')} callBack={() => searchMovie("")} key={movie._id} />
          })
      }
    </div>
  );
};

export default AllMoviesComp;
