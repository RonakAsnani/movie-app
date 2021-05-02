import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setFavourite} from '../actions';



class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(() => {
     // console.log('Updated');
      this.forceUpdate(); // not recommended 
      console.log(this.props.store.getState());
    })
    // make api call
    // dispatch actions
    store.dispatch(addMovies(data))

     console.log(this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();


    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      // found the movie
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setFavourite(val));
  }
  render(){
    const {movies, search} = this.props.store.getState();
  const {list, favourites, setFavourites} = movies; //{movies: {},search:{}}
   // console.log(favourites);
  
    const displayMovies= setFavourites ? favourites : list
  return (
    <div className="App">
      <Navbar search={search} dispatch={this.props.store.dispatch}/>
      <div className="main">
        <div className="tabs">
          <div className={`tab ${setFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${setFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list ">
            {displayMovies.map((movie,index) => (
              <MovieCard 
              movie={movie} key={`movies-${index}`} 
              dispatch={this.props.store.dispatch}
              isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
        </div>
              {displayMovies.length === 0 ? <div className="no-movies">No movies to display</div> : ''}
      </div>
    </div>
  );
}
}

export default App;
