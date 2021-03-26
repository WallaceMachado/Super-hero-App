import React, { Component }from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import Welcome from './pages/welcome/Welcome';
import Header from './components/Header/Header';


class App extends Component{
  render(){

  return (
    <BrowserRouter>
           <Header/>
            <Switch>
                <Route exact path="/" component={Welcome}/>

            </Switch>
        </BrowserRouter>
  );
}
}

export default App;
