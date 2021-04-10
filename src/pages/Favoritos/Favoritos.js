import React, { Component }from 'react';
import { NavItem } from 'react-bootstrap';
import './favoritos.css';
import firebase from '../../firebase';

class Favoritos extends Component{

    constructor(props){
        super(props);
        this.state = {
            allHerois: [1],
            searchText:'',
            begin:1,
            idHeroi:'',
            favoritos:[]
            
        }
        this.listAllHeroes = this.listAllHeroes.bind(this);
        this.deleteFavoritos=this.deleteFavoritos.bind(this);
        
        
    }

    componentDidMount(){
      if(!firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
    }
        
        this.listAllHeroes();
        
        
    }

    listAllHeroes = async(e) => {
       
        let favoritos = JSON.parse(localStorage.getItem('favoritos'));
        console.log(favoritos);
        let total = favoritos.length-1;
        let listHeroes=[];
        
        
        for(let i = 0; i <= total; i++){
            console.log('i',favoritos[i]);
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${favoritos[i]}`);
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
    
        this.setState({allHerois:listHeroes, begin:0, favoritos:favoritos});

        console.log(this.state.allHerois);
        
        
      }

     

      deleteFavoritos = async(e) => {
        console.log('e', e);
        
        if(e){
         let hasheroi =  await this.state.allHerois.filter(heroi=> heroi.id !==e );
         let hasFavorito =  await this.state.favoritos.filter(heroi=> heroi !==e );
          console.log('hasheroi', hasheroi);
          if(hasheroi){
             
          
         
          this.setState({allHerois:hasheroi});
          console.log('favoritos',hasFavorito);
         await localStorage.setItem('favoritos', JSON.stringify(hasFavorito));
          console.log('id',localStorage.getItem('favoritos'));
          
        }
       
      }
       
      
      
      

      
    }
  
  

    render(){

        return (
            
        <div className='mainDiv'>
          {!this.state.begin &&
          <div className='listheroi'>
            { this.state.allHerois.map(item =>(
                
                <article key={String(item.id)}>
                    <strong>{item.name}</strong>
                    <img src={item.image.url} alt={item.name} />       
                <button onClick={(e)=> this.deleteFavoritos(item.id)}>Excluir Favorito</button> 
  
              </article>
         
            )
            
        )}
        </div>
    }
        </div>
        );

    }
}


export default Favoritos;
