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
            <Container style={{              
                display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1800px', justifyContent: 'space-between', width: '100%'}}>
                
            <div className='details' >
                {!this.state.begin &&
                    <div className='detailsheroi'>
                <Form >
                
                <Form.Row className="align-items-center" >
                
                 
                 
                  
                  <Col style={{              
                   display: 'flex'}}>
                  <HashLink smooth to="#Powerstats" 
                  style={{              
                   fontSize: '25px', color:'#fff'}} >
                       Powerstats </HashLink>
                       </Col>
                    <Col>
                  <HashLink smooth to="#Biography" style={{              
                   fontSize: '25px', color:'#fff'}}>Biography</HashLink>
                  </Col>
                  <Col>
                  <HashLink smooth to="#Connections" style={{              
                   fontSize: '25px', color:'#fff'}}>Connections</HashLink>
                  </Col>
                  <Col>
                  <HashLink smooth to="#Appearance" style={{              
                   fontSize: '25px', color:'#fff'}}>Appearance</HashLink>
                  </Col>
                  <Col>
                  <HashLink smooth to="#Work" style={{              
                   fontSize: '25px', color:'#fff'}}>Work</HashLink>
             
                  </Col>
                
                </Form.Row>
                </Form>
                    
                        { this.state.hero.map(item =>(

                            <article key={String(item.id)}>
                                <strong  style={{              
                   fontSize: '25px', color:'#f70606'}}>{item.name}</strong>
                                <img src={item.image.url} alt={item.name} />
                            
                            </article>
                            ))

                        }

                        <div className='powerstats'  > 
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