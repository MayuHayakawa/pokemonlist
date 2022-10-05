import { Component } from 'react'; //クラスコンポーネントのファイル参照

import './App.css';


//クラスコンポーネントの拡張
class App extends Component {
  constructor() {
    super();

    // https://pokeapi.co/api/v2/pokemon/810
    this.state = {
      pokemons: []
    };
  }
  //コンポーネントがDOM上に配置された瞬間が、APIリクエストを行うタイミング
  componentDidMount() {
    for(let i = 810; i < 898; i++){
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      // fetch(`https://pokeapi.co/api/v2/pokemon/810`)
      .then((response) => response.json())
      .then((datas) => //console.log(datas)
        this.setState(
          () => {
            return { pokemons: datas};
          },
          () => {
            console.log(this.state);
          }
        )
      )
    }
  }

  render() {
    return (
      <div className="App">
          {this.state.pokemons.map((pokemon) => {
              return (
              <div key={pokemon.id}>
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
