import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';


const SingleMovie = () => {
  const { id } = useParams();
  const API_URL = `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_API_KEY}`;

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const [favorite, setFavorite] = useState([]);


    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data) {
                setIsLoading(false);
                setMovie(data);
            } 
        } catch (error) {
            console.log(error);
        }
    }

    //debouncing being used here since I want only 1 API response per second

    useEffect(()=> {
        let timerOut = setTimeout(()=> {
            getMovies(`${API_URL}/${id}`);
        }, 500);

        return () => clearTimeout(timerOut); // a clean up function being used to achieve our goal alongside setTimeout
    }, [id]);

    if(isLoading) {
      return (
        <div className="movie-section">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    // a function that adds movies to favorites
  const addFavMovie = id => {
      const favList = [...favorite, movie];
      setFavorite(favList);
      // if(!favorite.includes(id)) setFavorite(favorite.concat(id));
      // console.log(id);
      
  }

  // a function to remove the movie from favorite list
  // const removeFavMovie = id => {
  //   let index = favorite.indexOf(id);
  //   console.log(index);
  //   let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
  //   setFavorite(temp);
  // }

  //this variable is being used to hold all the favorite movies, being used to render all the favorite movies.
  // let findMovie = movie.filter(currMovie => favorite.includes(currMovie.id));

  return (
    <section className="movie-section">
        <div className = "movie-card">
          <figure>
            <img src={movie.image} alt="" />
          </figure>

          <div className="card-content">
            <p className="title">{movie.title}</p>
            <p className="card-text">{movie.releaseDate ? movie.releaseDate : `-`}</p>
            <p className="card-text">{movie.genres ? movie.genres : `-`}</p>
            <p className="card-text">{movie.imDbRating ? movie.imDbRating : `Not yet rated`} / 10</p>
            <p className="card-text">{movie.plot ? movie.plot : `-`}</p>
            <NavLink to= "/" className = "back-btn"> Go Back </NavLink>
            {/* <span><NavLink to = "/" className = "back-btn" onClick = {()=> addFavMovie(movie.id)}> Add to Favorites</NavLink></span> */}
            {/* <NavLink to = "/" className = "back-btn" onClick = {()=> removeFavMovie(movie.id)}> Remove from Favorites</NavLink> */}
          </div>

        </div>
    </section>
  )
}

export default SingleMovie