import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';

class Biography extends Component{

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
                    
                    <h1 style={{color:'#f70606'}}>Biography</h1>
                  </Col>
                
                  
                  <Col xs="auto" className="my-1" style={{ paddingTop:'20px', paddingBottom: '20px' }}>
                    <Row><a style={{color:'#f70606', paddingRight: '5px'}}>Full-Name: </a> 
                   {this.state.list[0]}</Row>   
                    <Row> <h3>alter-egos: </h3>
                     {this.state.list[1]}</Row>   
                     <Row><h3>place-of-birth: </h3>
                   {this.state.list[3]}</Row>   
                   <Row> <h3>first-appearance: </h3>
                   {this.state.list[4]}</Row>   
                   <Row><h3>publisher: </h3>
                   {this.state.list[5]}</Row>   
                   <Row> <h3>alignment: </h3>
                   {this.state.list[6]}  </Row>                  
                  </Col>
                
                </Form.Row>
                
              </Form>
            </Container>
        );
        }
    }
    export default Biography;