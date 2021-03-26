import React, { Component }from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import Welcome from './pages/welcome/Welcome';


class App extends Component{
  render(){

  return (
    <BrowserRouter>
           
            <Switch>
                <Route exact path="/" component={Welcome}/>

            </Switch>
        </BrowserRouter>
  );
}
}

export default App;
