import React, { Component }from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase'


import Welcome from './pages/welcome/Welcome';
import Header from './components/Header/Header';
import Favoritos from './pages/Favoritos/Favoritos';
import HeroDetails from './pages/HeroDetails/HeroDetails';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


class App extends Component{

  state={
    firebaseInitialized: false
  };
  
  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      this.setState({
        firebaseInitialized: resultado
      });
    })
  }

  render(){

  return this.state.firebaseInitialized !== false? (
    <BrowserRouter>
           <Header/>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/welcome" component={Welcome}/>
                <Route exact path="/favoritos" component={Favoritos}/>
                <Route exact path="/HeroDetails/:id" component={HeroDetails}/>
                <Route exact path="/register" component={Register}/>


            </Switch>
        </BrowserRouter>
  ):(
    <h1>Carregando...</h1>
  )
}
}

export default App;
