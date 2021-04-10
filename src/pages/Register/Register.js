import React, { Component }from 'react';
import {Link, withRouter} from 'react-router-dom'; // withRouter dá possibilidade de acesso ao histórico
import firebase from '../../firebase'
import './Register.css'


class Register extends Component{
    constructor(props){
        super(props);
        this.state ={
            name:'',
            lastName: '',
            cel:'',
            email: '',
            password: ''
        };
        
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

   
    register(e){

        e.preventDefault();

        this.onRegister();
    }

    onRegister = async() =>{

        try{
            
            const{name,lastName,cel,email,password}= this.state;

            await firebase.register(name,lastName,cel,email,password);

            this.props.history.replace('/Welcome');

        }catch(error){
            alert(error.message);
        }

    }
   
    

    render(){
        return(
            <div>
               <h1 className="register-h1">Novo usuário</h1>
               <form onSubmit={this.register} id="register">
                   <label>Nome:</label><br/>
                   <input type="text" autoComplete="off" autoFocus value={this.state.name}
                    onChange={(e)=> this.setState({name: e.target.value})} placeholder="Digite seu nome"
                    /><br/>
                      <label>Sobre Nome:</label><br/>
                   <input type="text" autoComplete="off"  value={this.state.nome}
                    onChange={(e)=> this.setState({lastName: e.target.value})} placeholder="Digite seu sobrenome"
                    /><br/>
                      <label>Celular:</label><br/>
                   <input type="text" autoComplete="off"  value={this.state.cel}
                    onChange={(e)=> this.setState({cel: e.target.value})} placeholder="(xx) 99999-9999"
                    /><br/>
                   <label>Email:</label><br/>
                    <input type="email" autoComplete="off"  value={this.state.email}
                    onChange={(e)=> this.setState({email: e.target.value})} placeholder="teste@teste.com"
                    /><br/>
                    <label>Password:</label><br/>
                    <input type="password" autoComplete="off" value={this.state.password}
                    onChange={(e)=> this.setState({password: e.target.value})} placeholder="digite sua senha"
                    /><br/>

                    <button type='submit'>Cadastrar</button>

               </form>
               
            </div>
        )
    }
}

export default withRouter(Register);