import React, { Component } from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

import './heroDetails.css';
import Biography from './biography';
import Powerstats from './powerstats';
import Connections from './connections';
import Appearance from './appearance';
import Work from './work';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';

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
            <Container>
                
            <div className='details'>
                {!this.state.begin &&
                    <div className='detailsheroi'>
                <Form>
                
                <Form.Row className="align-items-center">
                
                 
                 
                  
                  <Col xs="auto" className="my-1" style={{ paddingTop:'20px', paddingBottom: '20px' }}>
                  <HashLink smooth to="#Powerstats" >Powerstats</HashLink>
                  <HashLink smooth to="#Biography">Biography</HashLink>
                  <HashLink smooth to="#Connections">Connections</HashLink>
                  <HashLink smooth to="#Appearance">Appearance</HashLink>
                  <HashLink smooth to="#Work">Work</HashLink>
                    
                        
                                    
                  </Col>
                
                </Form.Row>
                </Form>
                    
                        { this.state.hero.map(item =>(

                            <article key={String(item.id)}>
                                <strong>{item.name}</strong>
                                <img src={item.image.url} alt={item.name} />
                            
                            </article>
                            ))

                        }

                        <div className='powerstats'> 
                        <div>
                        <Powerstats list={this.state.powerstats}/>
                        </div>
                        <div>
                        <Biography list={this.state.biography}/>
                        </div>
                        <div>
                        <Connections list={this.state.connections}/>
                        </div>
                        <div>
                        <Appearance list={this.state.appearance}/>
                        </div>
                        <div>
                        <Work list={this.state.work}/>
                        </div>
            
                        </div>
                    </div>
                }
          </div>
          </Container>
        );
    }
}

export default HeroDetalis;