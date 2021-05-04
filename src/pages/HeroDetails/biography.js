import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

class Biography extends Component{

    constructor(props){
        super(props);
        this.state = {
            
            list:this.props.list,
            
        }
       
        
        
    }

    

    
    render(){
        
        return(
            <Container id="Biography">
                
                

              <Row>
                  
                  <Col>
                    <Card style={{ marginLeft: '-3.1rem', width: '75rem', border:'#fff', background:'transparent', justifyContent: 'space-between' }}>
                      <Card.Title style={{  fontSize: '25px',textAlign: 'left',marginTop: '.5rem',  color: '#f70606' }}>Biography</Card.Title>
                    
                      <Card.Body style={{color:'#fff'}}>
                      
                        <Col xs="auto" className="my-1" >
                      
                          <Row><h3>Full-Name: {this.state.list[0]}</h3></Row>   
                          <Row> <h3>Alter-egos: {this.state.list[1]}</h3></Row>   
                          <Row><h3>Place-of-birth: {this.state.list[3]}</h3></Row>   
                          <Row> <h3>First-appearance:  {this.state.list[4]}</h3></Row>   
                          <Row><h3>Publisher: {this.state.list[5]}</h3></Row>   
                          <Row> <h3>Alignment: {this.state.list[6]}  </h3></Row>
                              
                        </Col>
                  
                      </Card.Body>
                    </Card>
                    
                  </Col>
        
              
             </Row>
            </Container>
        );
        }
    }
    export default Biography;