import React from 'react';
import { useGlobalContext } from './context';
import { NavLink } from 'react-router-dom';


const Movies = () => {
  const { movie,isLoading } = useGlobalContext();

  if(isLoading) {
    return (
      <div>
        <div className="loading">Loading...</div>
      </div>
    );
  }



  return (
    <>

            <section className="movie-page">
              <div className="grid grid-4-col">
                {movie.map(currMovie => {
                  const { id, title, image } = currMovie;
                  const movieName = title.substring(0,15);

                  return (
                    <NavLink to = {`movie/${id}`} key = {id}>
                      <div className="card">
                        <div className="card-info">
                          <h2>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                          <img src={image} alt={id} />
                        </div>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </section>

        
    </>
  )
}

export default Movies