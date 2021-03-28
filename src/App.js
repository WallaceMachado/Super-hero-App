import React, { Component }from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import Welcome from './pages/welcome/Welcome';
import Header from './components/Header/Header';
import Favoritos from './pages/Favoritos/Favoritos';
import HeroDetails from './pages/HeroDetails/HeroDetails';


class App extends Component{
  render(){

  return (
    <BrowserRouter>
           <Header/>
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route exact path="/favoritos" component={Favoritos}/>
                <Route exact path="/HeroDetails/:id" component={HeroDetails}/>

            </Switch>
        </BrowserRouter>
  );
}
}

export default App;
