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
            favoritos:[],
            listHeroes:[]
            
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
       
        
        
        let listHeroes=[];
        let listfavoritos=[];
        const uid = firebase.getCurrentId();
        
       await firebase.app.ref('usuarios').child(uid).child('Favoritos').once('value',(snapshot)=> {
         
          
          snapshot.forEach((childItem)=> {
            listfavoritos=[...listfavoritos, childItem.val()]});
          
          });

          console.log(listfavoritos);
          let total = listfavoritos.length-1;
        
        
        for(let i = 0; i <= total; i++){
            console.log('i',listfavoritos[i]);
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${listfavoritos[i]}`);
          const data = await response.json();
    
         listHeroes= [...listHeroes, {
    
            id: data.id,
            name: data.name,
           
            image:data.image
          }];
        }            
    
        this.setState({allHerois:listHeroes, begin:0, favoritos:listfavoritos});

        console.log(this.state.allHerois);
        
        
      }

     

      deleteFavoritos = async(e) => {
        console.log('e', e);
        
        try{
          if(e){
           await firebase.deleteFavorite(e);
           alert("Heroi deletado dos favoritos");
           this.listAllHeroes();
          }
        }catch(error){
          alert(error.message);
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
