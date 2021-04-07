import React, { Component }from 'react';
import { NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './welcome.css';
import firebase from '../../firebase'

class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {
            allHerois: [],
            searchText:'',
            begin:1,
            idHeroi:'',
            favoritos:[]
            
        }
        this.listAllHeroes = this.listAllHeroes.bind(this);
        this.searchSuperHeroes = this.searchSuperHeroes.bind(this);
        this.addFavoritos = this.addFavoritos.bind(this);
    }

    componentDidMount(){
      if(!firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
    }

    firebase.getUserName((info)=>{
        
        localStorage.nome = info.val().nome;
        this.setState({name: localStorage.nome});
    })
        if(this.state.begin){
        this.listAllHeroes();
        }
        console.log('favoritos',localStorage.getItem('favoritos'));
        
    }

    listAllHeroes = async() => {
        let listHeroes = [];
    
        let total = 5;
        for(let i = 1; i <= total; i++){
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${i}`);
          const data = await response.json();
    
         listHeroes= [...listHeroes, {
    
            id: data.id,
            name: data.name,
            powerstats: data.powerstats,
            biography: data.biography,
            appearance: data.appearance,
            work: data.work,
            connections: data.connections,
            image:data.image
          }];
        }            
    
        this.setState({allHerois:listHeroes, searchText:''});

        console.log(listHeroes);
        
        
      }

       searchSuperHeroes = async() => {
           
        const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/search/${this.state.searchText}`);
        const data = await response.json();
        this.setState({begin:0});
        console.log(data.results);
        this.setState({allHerois:data.results});

        
      }

       addFavoritos =async(e) => {
        console.log('e', e);
        
          if(e){
            let hasheroi = this.state.favoritos.find(heroi=> heroi ===e );
            console.log('hasheroi', hasheroi);
            if(!hasheroi||hasheroi ==="undefined"){
               
            
           let favoritos= [...this.state.favoritos, e]; 
            this.setState({favoritos:favoritos});
            console.log('favoritos',favoritos);
           await localStorage.setItem('favoritos', JSON.stringify(favoritos));
            console.log('id',localStorage.getItem('favoritos'));
          }
         
        }
         
        
        
        

        
      }
    
    
    


    render(){

        return (
            
        <div className='mainDiv'>
          
          <div className='search'>
            <input type="text" value={this.state.searchText} 
                  onChange={(e) => this.setState({searchText: e.target.value})} placeholder="faça uma pesquisa"/><br/> 
 
            <button onClick={this.searchSuperHeroes}>Pesquisar</button> 
            <button onClick={this.listAllHeroes}>Listar Todos</button> 
        </div>

        <div className='listheroi'>
            { this.state.allHerois.map(item =>(
                
                <article key={String(item.id)}>
                    <strong>{item.name}</strong>
                    <Link to={`/HeroDetails/${item.id}`}>
                    <img src={item.image.url} alt={item.name} />
                </Link> 
                <button onClick={(e)=> this.addFavoritos(item.id)}>Adicionar aos Favoritos</button> 
                
  
              </article>
         
            )
            
        )}
        </div>
        </div>
        );

    }
}


export default Welcome;
