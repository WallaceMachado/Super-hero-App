import React, { Component } from 'react';
import './heroDetails.css'
import {Link} from 'react-router-dom';

class HeroDetalis extends Component{

    constructor(props){
        super(props);
        this.state = {
            hero: [],
            begin:1,
            powerstats:[],
            connections:[]
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
        let powerstats=[];
        let connections=[];
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

        Object.keys(data.connections).forEach(function(item){
            connections=  [...connections, data.connections[item]]});
          


        
        let x=data.powerstats;
        powerstats=[{x}]
        this.setState({hero:hero,powerstats:powerstats, begin:0, connections:connections});

        console.log(this.state.hero);
        console.log(this.state.powerstats);
        console.log("connections: ",connections);

        


      }


    render(){
        
        return(
            <div className='details'>
            {!this.state.begin &&
            <div className='detailsheroi'>
              { this.state.hero.map(item =>(

                  <article key={String(item.id)}>
                      <strong>{item.name}</strong>
                      <img src={item.image.url} alt={item.name} />
                   
                      </article>
              ))

          }

          
<div className='powerstats'> 
          {
             
               this.state.powerstats.map(item =>(

                <article key={String(item.x.intelligence)}>
                    <strong>Powerstats</strong>
                    <h3>Inteligencia: {item.x.intelligence}</h3>
                    
                    <h3>strength: {item.x.strength}</h3>
                    <h3>speed: {item.x.speed}</h3>
                    <h3>durability: {item.x.durability}</h3>
                    <h3>power: {item.x.power}</h3>
                    <h3>combat: {item.x.combat}</h3>
                    
                    
              </article>
               ))

               }
              
                 {
               

                <article key={String("1")}>
                    <strong>Connections</strong>
                    <h3>Group-Affiliation: </h3>
                    <h4>{this.state.connections[0]}</h4>
                    <h3>Relatives: </h3>
                    <h4>{this.state.connections[1]}</h4>
                
              </article>
               
               

               }
        </div>
          </div>
      }
          </div>
        );
    }
}

export default HeroDetalis;