import React, { Component }from 'react';

import {Link} from 'react-router-dom';
import './login.css';

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
          
         <h1>Login</h1>
        </div>
        );

    }
}


export default Welcome;
