import React, { Component } from 'react';
import './heroDetails.css'
import {Link} from 'react-router-dom';

class HeroDetalis extends Component{

    constructor(props){
        super(props);
        this.state = {
            hero: [],
            begin:1,
            powerstats:[]
        }
        this.detelaisHero = this.detelaisHero.bind(this);
    }

    componentDidMount(){
        console.log(this.props.match.params);
        if(this.state.begin){
            this.detelaisHero();
            }


    }

    

    detelaisHero = async(e) => {
        const { id } = this.props.match.params;
        let hero =[];
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${id}`);
          const data = await response.json();
          console.log(data);

          hero=  [...hero,{
    
            id: data.id,
            name: data.name,
            powerstats: data.powerstats,
            biography: data.biography,
            appearance: data.appearance,
            work: data.work,
            connections: data.connections,
            image:data.image}
        ];
                 
    
        this.setState({hero:hero,powerstats:data.powerstats, begin:0});

        console.log(this.state.hero);
        console.log(this.state.powerstats);
        
        
      }


    render(){
        return(
            <div className='mainDiv'>
            {!this.state.begin &&
            <div className='listheroi'>
              { this.state.hero.map(item =>(
                  
                  <article key={String(item.id)}>
                      <strong>{item.name}</strong>
                      <img src={item.image.url} alt={item.name} />
                      <h1>Inteligencia: {item.powerstats.intelligence}</h1>
                </article>
           
              )
              
          )}
         
          </div>
      }
          </div>
        );
    }
}

export default HeroDetalis;