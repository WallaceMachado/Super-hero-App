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
            connections:[],
            biography:[],
            appearance:[],
            work:[]
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
        let biography=[];
        let appearance=[];
        let work=[];
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

        Object.keys(data.biography).forEach(function(item){
            biography=  [...biography, data.biography[item]]});

        Object.keys(data.connections).forEach(function(item){
            connections=  [...connections, data.connections[item]]});
        
        Object.keys(data.appearance).forEach(function(item){
            appearance=  [...appearance, data.appearance[item]]});

        Object.keys(data.work).forEach(function(item){
            work=  [...work, data.work[item]]});
          

            
        
        let x=data.powerstats;
        powerstats=[{x}]
        this.setState({hero:hero,powerstats:powerstats, begin:0, connections:connections,biography:biography,appearance:appearance,work:work});

        console.log(this.state.hero);
        console.log(this.state.powerstats);
        console.log("connections: ",connections);
        console.log("appearance: ",appearance);

        


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
                    {this.state.connections[0]}
                    <h3>Relatives: </h3>
                    {this.state.connections[1]}
                
              </article>
               
               }

               

                {
               
               <article key={String("2")}>
                   <strong>appearance</strong>
                   <h3>gender: </h3>
                   {this.state.appearance[0]}
                   <h3>race: </h3>
                   {this.state.appearance[1]}
                   <h3>eye-color: </h3>
                   {this.state.appearance[4]}
                   <h3>hair-color: </h3>
                   {this.state.appearance[6]}
               
             </article>
              
              }

{
               
               <article key={String("3")}>
                   <strong>biography</strong>
                   <h3>full-namen: </h3>
                   {this.state.biography[0]}
                   <h3>alter-egos: </h3>
                   {this.state.biography[1]}
                   <h3>place-of-birth: </h3>
                   {this.state.biography[3]}
                   <h3>first-appearance: </h3>
                   {this.state.biography[4]}
                   <h3>publisher: </h3>
                   {this.state.biography[5]}
                   <h3>alignment: </h3>
                   {this.state.biography[6]}
               
             </article>

             
              
              }

{
               
               <article key={String("2")}>
                   <strong>work</strong>
                   <h3>occupation: </h3>
                   {this.state.work[0]}
                   <h3>base: </h3>
                   {this.state.work[1]}
                   
                  
               
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