import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

class Work extends Component{

    constructor(props){
        super(props);
        this.state = {
            allHerois: [1],
            searchText:'',
            begin:1,
            idHeroi:'',
            favoritos:[],
            listHeroes:[],
            loading: true,
            list:this.props.list,
            
        }
       
        
        
    }

    

    
    render(){
        
        return(
            <Container>
                
                <Form>
                
                <Form.Row className="align-items-center">
                
                  <Col sm={3} className="my-1"  style={{ paddingTop:'20px', paddingBottom: '20px', paddingLeft: '40px' }}>
                    
                    <h1 style={{color:'#f70606'}}>Work</h1>
                  </Col>
                 
                  
                  <Col xs="auto" className="my-1" style={{ paddingTop:'20px', paddingBottom: '20px' }}>
                    
                    <Row> <h3>Occupation: {this.state.list[0]}</h3></Row>   
                     <Row><h3>Base: {this.state.list[1]}</h3></Row>
                        
                                    
                  </Col>
                
                </Form.Row>
                
              </Form>
            </Container>
        );
        }
    }
    export default Work;