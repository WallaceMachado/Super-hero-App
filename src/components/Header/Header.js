import React, { Component }from 'react';
import {Link, withRouter} from 'react-router-dom'; 
import Switch from 'react-switch'; // cria o botão para mudar de tema
import {ThemeContext} from 'styled-components';
import './header.css'
import {ContainerHeader} from './styles';
import File from '../../Marvel.jpg';
import firebase from '../../firebase';
import GlobalStyleDark from '../../styles/globalDark';
import globalDark from '../../styles/globalDark';



class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: localStorage.nome,
            tema: this.props.background,
           
        };
        
        this.logout = this.logout.bind(this);
        this.getTema = this.getTema.bind(this);
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

        let themeGet = JSON.parse(localStorage.getItem('tema'));
    
    
        this.setState({tema: themeGet})


    
}


    getTema (){
        let themeGet = JSON.parse(localStorage.getItem('tema'));
        console.log('themeGet: ', themeGet);
        if(themeGet=== null|| themeGet ==='null'){
        
        this.setState({tema:false})
        
        }else{
            if (themeGet) {
        this.setState({tema:themeGet})
        }else{
            this.setState({tema:false})
        }

        }

        this.props.alterarTheme();


    }

    async logout ()  {
       
        await  firebase.logout()
        .catch((error)=>{
            console.log(error);
        });
        localStorage.removeItem("nome");
        localStorage.removeItem('tema');//remover nome salvo no localstorage
        this.props.history.replace('/');
       
  }

 
  render(){

    
        return(

            
            <header id="main-header">
                <ContainerHeader background={this.props.background}>
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
                    
                <Switch
            
            onChange={this.getTema}
            checked={this.state.tema === false}
            checkedIcon={false}
            uncheckedIcon={false}
            height={15}
            width={40}
            handleDiameter={20}
            offColor={'#f5f5f5'}
            onColor={'#333'}
           
            />

            
                </div>
                :(<div className="header-content">
               
                <img src={File} alt="logo"/>
               
            
                </div>)}
                </ContainerHeader> 
            </header>
           
            
        )
    }
}

    export default withRouter(Header);


