import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PokemonList from './page/PokemonList';
import PokemonDetail from './page/PokemonDetail';
import OwnedPokemon from './page/OwnedPokemon';
import Header from './component/header';
import Home from './page/Home';

const Routes = () => {
  return (
    <Router>
      <Header />
      <div className='mt-20'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={PokemonList} />
          <Route path="/pokemon/:id" component={PokemonDetail} />
          <Route path="/owned" component={OwnedPokemon} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
