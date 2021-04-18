import React, { Component }from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase'
import dark from './styles/dark'
import GlobalStyleDark from './styles/globalDark';
import GlobalStylelight from './styles/globalLight';


import Welcome from './pages/welcome/Welcome';
import Header from './components/Header/Header';
import Favoritos from './pages/Favoritos/Favoritos';
import HeroDetails from './pages/HeroDetails/HeroDetails';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


class App extends Component{
  constructor(props){
    super(props);
  this.state={
    firebaseInitialized: false,
    tema:localStorage.tema,
    background:  localStorage.background
  };
  this.alterarTheme = this.alterarTheme.bind(this);
  this.getTema = this.getTema.bind(this);

}
  
  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      this.setState({
        firebaseInitialized: resultado
      });
    })
    
    this.getTema();

  }

  getTema(){
    let themeGet = JSON.parse(localStorage.getItem('tema'));
    console.log('themeGet: ', themeGet);
    if(themeGet=== null|| themeGet ==='null'){
      localStorage.setItem('tema', JSON.stringify(false));
      localStorage.setItem('background', JSON.stringify('#333'));
      themeGet = JSON.parse(localStorage.getItem('tema'));
      let background = JSON.parse(localStorage.getItem('background'));
      this.setState({tema:themeGet, background:background})
      
    }else{
      let background = JSON.parse(localStorage.getItem('background'));
      this.setState({tema:themeGet,background:background})
    }
  }

  alterarTheme (){
        
    let themeGet = JSON.parse(localStorage.getItem('tema'));
    console.log('tema: ', themeGet);
    if(themeGet=== null|| themeGet ==='null'){
      localStorage.setItem('tema', JSON.stringify(false));
      localStorage.setItem('background', JSON.stringify('#333'));
      themeGet = JSON.parse(localStorage.getItem('tema'));
      let background = JSON.parse(localStorage.getItem('background'));
      this.setState({tema:themeGet, background:background})
      
    }else{
    if(themeGet){
       localStorage.setItem('tema', JSON.stringify(false));
       localStorage.setItem('background', JSON.stringify('#333'));
       this.setState({tema:false,background:'#333'});
       
       
    
            
    } else{
        localStorage.setItem('tema', JSON.stringify(true));
        localStorage.setItem('background', JSON.stringify('#800404'));
        this.setState({tema:true,background:'#800404'});
    }
    }
    themeGet = JSON.parse(localStorage.getItem('tema'));
    
    let background = JSON.parse(localStorage.getItem('background'));
    this.setState({tema:themeGet,background:background})
    console.log('tema: ', this.state.tema);
    }


  render(){

  return this.state.firebaseInitialized !== false? (
    <BrowserRouter>
           
           {this.state.tema === true? <GlobalStylelight/> : <GlobalStyleDark/>}
           <Header alterarTheme={this.alterarTheme.bind(this)} background={this.state.background}/>
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
