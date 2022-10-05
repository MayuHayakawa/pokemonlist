import { Component } from 'react'; //クラスコンポーネントのファイル参照

import './App.css';


//クラスコンポーネントの拡張
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
    // this.getPokemonsById(1);
    
    // for(let i = 810; i < 898; i++){
    //   fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    //   // fetch(`https://pokeapi.co/api/v2/pokemon/810`)
    //   .then((response) => response.json())
    //   .then((datas) => //console.log(datas)
    //     this.setState(
    //       () => {
    //         return { pokemons: datas};
    //       },
    //       () => {
    //         console.log(this.state);
    //       }
    //     )
    //   )
    // }
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
          console.log(data);
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
              </div>
              )
            })
          }
      </div>
    );
  };
};

export default App;
