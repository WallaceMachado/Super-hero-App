import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

class Connections extends Component{

    constructor(props){
        super(props);
        this.state = {
           
            list:this.props.list,
            
        }
       
        
        
    }

    

    
    render(){
        
        return(
            <Container id="Connections">
                
                

              <Row>
                  
                  <Col>
                    <Card style={{ marginLeft: '-3.1rem', width: '75rem', border:'#fff', background:'transparent', justifyContent: 'space-between' }}>
                      <Card.Title style={{  fontSize: '25px',textAlign: 'left',marginTop: '.5rem',  color: '#f70606' }}>Connections</Card.Title>
                      

                      
                      <Card.Body style={{color:'#fff'}}>
                      
                      <Col xs="auto" className="my-1" >
                    
                      <Row> <h3>Group-Affiliation: {this.state.list[0]}</h3></Row>   
                     <Row><h3>Relatives: {this.state.list[1]}</h3></Row>   
                                    
                        
                                    
                  </Col>
                  
                      </Card.Body>
                    </Card>
                    
                  </Col>
        
              
             </Row>
            </Container>
        );
        }
    }
    export default Connections;