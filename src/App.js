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
      
    };
  }
  //コンポーネントがDOM上に配置された瞬間が、APIリクエストを行うタイミング
  componentDidMount() {
    this.getPokemons();
  }

  getPokemons(){
    // gets all pokemons
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
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
          return { data }
          // console.log(data);
        }
      )
    })
  }

  render() {
    return (
      <div className="App">
          {this.state.pokemons.map((pokemon, index) => {
              return (
              <div key={index}>
                <h1>{pokemon.name}</h1>

                {/* How can I get img src...?
                (Now I get pokemon's details with pokemon's name not id, because I don't know how to get id data from pokemons'state.)
                Should I create new state of each pokemons api data to get value like img?(I mean it is array's of `https://pokeapi.co/api/v2/pokemon/${id}`)
                Or it's better to get id to get img's src?(ex; `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`) */}
                <img src="{this.getPokemonsById(pokemon.name).sprites.front_default}" />
                {/* <button onClick={this.getPokemonsById(pokemon.name)}>Detail</button> */} 
              </div>
              )
            })
          }
      </div>
    );
  };
};

export default App;