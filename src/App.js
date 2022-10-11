//File references for class components
import { Component } from 'react';

import './App.css';


//Extending Class Components
class App extends Component {
  constructor() {
    super();

    // https://pokeapi.co/api/v2/pokemon/810
    this.state = {
      pokemons: [],
      searchField: '',
    };
  }
  //The moment a component is placed on the DOM is the time to make an API request
  componentDidMount() {
    this.getPokemons();
  }

  getPokemons(){
    // gets all pokemons
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
    // fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)

    // fetches the pokemons from the api
    .then(
      // then we get the response and convert it to json
      (response) => response.json()
    ).then((data) => {
      // then we set the state to the data we got from the api
      this.setState(
        () => {
          return { pokemons: data.results};
        }
      )
    })
  }

  getPokemonsById(id){
    // gets pokemon by id
    // you can use this when you click on a pokemon to get more details.
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(
      (response) => response.json()
    ).then((data) => {
      this.setState(
        () => {
          console.log(data);
        }
      )
    })
  }

  getPokemonsImgByName(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(
      (response) => response.json()
    ).then((data) => {
      this.setState(
        () => {
          //ex; https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png
          return data.sprites.front_default;
          // console.log(data.sprites.front_default);
        }
      )
    })
  }

  render() {
    //Update values of pokemons(this state) each time you input something to searchbox 
    const filteredPokemons = this.state.pokemons.filter((pokemon) => {
      return pokemon.name.toLocaleLowerCase().includes(this.state.searchField);
    });
    
    return (
      <div className='App'>
        <input 
          className='search-box'
          type='search'
          placeholder='search pokemons' 
          //when you input something to this searchbox, searchField state is created
          onChange={(event) => {
            const searchField = event.target.value.toLocaleLowerCase();
            this.setState(() => {
              return { searchField };
            })
          }}
          />
          {filteredPokemons.map((pokemon, index) => {
            return (
              <div key={index}>
                <h1>{pokemon.name}</h1>

                {/* How can I get img src...?
                (Now I get pokemon's details with pokemon's name not id (getPokemonsImgByName()),
                because I don't know how to get id data from pokemons'state...) */}
                <img src="{this.getPokemonsImgByName(pokemon.name)}" alt={pokemon.name}/>

                {/* ↓It can get img's url on console when I set getPokemonsImgByName()'s setState is console.log(), but I don't know why...
                <button onClick={this.getPokemonsImgByName(pokemon.name)}></button> */}

              </div>
              )
            })
          }
      </div>
    );
  };
};

export default App;