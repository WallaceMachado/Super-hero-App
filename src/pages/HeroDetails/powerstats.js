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

              <Row>
                  {this.state.list.map(item =>(
                  <Col>
                    <Card style={{ marginLeft: '-3.1rem', width: '75rem', border:'#fff', background:'transparent', justifyContent: 'space-between' }}>
                      <Card.Title style={{  fontSize: '25px',textAlign: 'left',marginTop: '.5rem',  color: '#f70606' }}>Powerstats</Card.Title>
                      

                      
                      <Card.Body>
                      <Row style={{color:'#fff'}}>
                  <Col >
                    <Row><h3>Inteligencia: {item.x.intelligence}</h3></Row>

                    <Row> <h3>strength: {item.x.strength}</h3></Row> 
                    </Col> 
                    <Col> 
                     <Row><h3>speed: {item.x.speed}</h3></Row>   
                   <Row> <h3>durability: {item.x.durability}</h3></Row> 
                   </Col> 
                   <Col>  
                   <Row><h3>power: {item.x.power}</h3></Row>   
                   <Row> <h3>combat: {item.x.combat}</h3>  </Row>                  
                  </Col>
                  </Row>
                      </Card.Body>
                    </Card>
                    
                  </Col>
        
              ))}
             </Row>
            </Container>
        );
        }
    }
    export default Powerstats;