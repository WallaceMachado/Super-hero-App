import React, { Component }from 'react';
import {Link, withRouter} from 'react-router-dom'; // withRouter dá possibilidade de acesso ao histórico
import firebase from '../../firebase'
import './login.css'


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: ''
        };
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
      //verifca se já tem alguem logado, metodo feito no firebase.js
      if(firebase.getCurrent()){
          return  this.props.history.replace('/Welcome');
      }
  }

    entrar(e){
        e.preventDefault();
        this.login();
    }

    login = async () =>{
        const {email,password}=this.state;
        try{
            await firebase.login(email,password)
            .catch((error)=>{
                if(error==="auth/user-not-found"){
                    alert("Este usuário não existe!");
                }else{
                    alert("Código de erro: " + error.code);
                    return null;
                }
            });

            this.props.history.replace('/Welcome');
        } catch(error){
            alert(error.message);
        }
    }

    render(){
        return(
            <div>
                {console.log("cheguei")}
                <form onSubmit={this.entrar} id="login">
                    <label>Email:</label><br/>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                    onChange={(e)=> this.setState({email: e.target.value})} placeholder="teste@teste.com"
                    /><br/>
                    <label>Password:</label><br/>
                    <input type="password" autoComplete="off" value={this.state.password}
                    onChange={(e)=> this.setState({password: e.target.value})} placeholder="digite sua senha"
                    /><br/>
                    <button type='submit'>Entrar</button>

                    <Link to="/Register">Ainda não possui uma conta?</Link>
                </form>
               
            </div>
        )
    }
}

export default withRouter(Login);