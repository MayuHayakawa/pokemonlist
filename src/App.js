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
      images:[]
    };
  }
  //The moment a component is placed on the DOM is the time to make an API request
  componentDidMount() {
    this.getPokemons();
    // this.getImagesFromPokeApi()
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
          return { pokemons: data.results };
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

  getImagesFromPokeApi(id) {
    // gets images from the pokeapi
    // you can use this when you click on a pokemon to get more details.
    // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    // .then(
    //   (response) => response.json()
    // ).then((data) => {
    //   return data.sprites.front_default;
    // })
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
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
                {/* instead of using api call, there is url that you can use. */}
                <img src={this.getImagesFromPokeApi(index+1)} alt={pokemon.name} />
                {/* How can I get img src...?
                (Now I get pokemon's details with pokemon's name not id (getPokemonsImgByName()),
                because I don't know how to get id data from pokemons'state...) */}
                {/* {this.getPokemonsImgByName(pokemon.name)} */}
                {/* <img src={require(this.getPokemonsImgByName(pokemon.name))} /> */}
                {/* <img src={this.getImagesFromPokeApi(pokemon.name)} alt={pokemon.name}/> */}

                {/* ↓It can get img's url on console when I set getPokemonsImgByName()'s setState is console.log(), but I don't know why...
                <button onClick={this.getPokemonsImgByName(pokemon.name)}></button> */}
                 {/* <button onClick={() => this.getPokemonsImgByName(pokemon.name)}></button> */}
              </div>
              )
            })
          }
      </div>
    );
  };
};

export default App;