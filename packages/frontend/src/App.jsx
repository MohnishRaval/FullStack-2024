import Displaypokemons from './components/displaypokemons.jsx';
import { Navbar } from './components/navbar.jsx';

const App = () => {
  return (
    <div className="App h-full">
      <Navbar></Navbar>
      <Displaypokemons></Displaypokemons>
    </div>
  );
};

export default App;
