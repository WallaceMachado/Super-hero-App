import React, { Component }from 'react';
import {Link, withRouter} from 'react-router-dom'; 
import './header.css'
import File from '../../Marvel.jpg';
import firebase from '../../firebase';


class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: localStorage.nome
        };

        this.logout = this.logout.bind(this);
    }

    async componentDidMount(){
        //verifica se tem algum usuário logado - getCurrent é definido no component firebase.js
        if(!firebase.getCurrent()){
            this.props.history.replace('/');
            return null;
        }

        firebase.getUserName((info)=>{
            
            localStorage.nome = info.val().nome;
            this.setState({name: localStorage.nome});
        })
    }

    async logout ()  {
       
        await  firebase.logout()
        .catch((error)=>{
            console.log(error);
        });
        localStorage.removeItem("nome");//remover nome salvo no localstorage
        this.props.history.replace('/');
       
  }
  render(){
        return(

          
            <header id="main-header">
                {firebase.getCurrent()?
                <div className="header-content">
                <Link to= "/Favoritos">
                    Favoritos
                </Link> 
                <Link to= "/Welcome">
                <img src={File} alt="logo"/>
                </Link> 
                
                <Link onClick={()=>this.logout()}>

                       Sair
                </Link> 

            
                </div>
                :(<div className="header-content">
               
                <img src={File} alt="logo"/>
               
            
                </div>)}
            </header>
        )
    }
}

    export default withRouter(Header);


