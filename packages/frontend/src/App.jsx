import { Displaypokemons } from './components/displaypokemons.jsx';
// import { Navbar } from './components/navbar.jsx';
import { Searchpokemon } from './components/searchpokemon.jsx';

const App = () => {
  return (
    <div className="App h-full">
      {/* <Navbar></Navbar> */}
      <Searchpokemon></Searchpokemon>
      <Displaypokemons></Displaypokemons>
    </div>
  );
};

export default App;
