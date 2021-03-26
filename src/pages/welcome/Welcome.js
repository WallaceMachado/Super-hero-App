import React, { Component }from 'react';
import { NavItem } from 'react-bootstrap';


class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {
            allHerois: []
            
        }
        this.listAllHeroes = this.listAllHeroes.bind(this);
    }

    componentDidMount(){
        this.listAllHeroes();
        
    }

    listAllHeroes = async() => {
        let listHeroes = [];
    
        let total = 10;
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
    
        this.setState({allHerois:listHeroes});
        console.log(listHeroes);
        
      }
    
    
    


    render(){

        return (
            
<div>
            
            { this.state.allHerois.map(item =>(
                
                <li key={String(item.id)}>
                    <h1>{item.name}</h1>
                <img src={item.image.url} alt={item.name} />
  
              </li>
         
            )
            
        )}
        
    </div>
        );

    }
}


export default Welcome;
