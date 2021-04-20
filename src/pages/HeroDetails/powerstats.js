import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

class Powerstats extends Component{

    constructor(props){
        super(props);
        this.state = {
          
            list:this.props.list,
            
        }
       
        
        
    }

    

    
    render(){
        
        return(
            <Container id="Powerstats">

                <Form>
                {this.state.list.map(item =>(
                <Form.Row className="align-items-center">
                
                  <Col sm={3} className="my-1"  style={{ paddingTop:'20px', paddingBottom: '20px', paddingLeft: '40px' }}>
                    
                    <h1 style={{color:'#f70606'}}>Powerstats</h1>
                  </Col>
                
                  
                  <Col xs="auto" className="my-1" style={{ paddingTop:'20px', paddingBottom: '20px', paddingLeft: '40px'  }}>
                    <Row><h3>Inteligencia: {item.x.intelligence}</h3></Row>

                    <Row> <h3>strength: {item.x.strength}</h3></Row>   
                     <Row><h3>speed: {item.x.speed}</h3></Row>   
                   <Row> <h3>durability: {item.x.durability}</h3></Row>   
                   <Row><h3>power: {item.x.power}</h3></Row>   
                   <Row> <h3>combat: {item.x.combat}</h3>  </Row>                  
                  </Col>
                
                </Form.Row>
                ))}
              </Form>
            </Container>
        );
        }
    }
    export default Powerstats;