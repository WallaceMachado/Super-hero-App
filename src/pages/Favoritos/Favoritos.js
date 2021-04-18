import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import {Link} from 'react-router-dom';
import './favoritos.css';

import firebase from '../../firebase';

class Favoritos extends Component{

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
            
        }
        this.listAllHeroes = this.listAllHeroes.bind(this);
        this.deleteFavoritos=this.deleteFavoritos.bind(this);
        
        
    }

    componentDidMount(){
      if(!firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
    }
        
        this.listAllHeroes();
        
        
    }

    listAllHeroes = async(e) => {
       
      this.setState({loading:true});
        
        let listHeroes=[];
        let listfavoritos=[];
        const uid = firebase.getCurrentId();
        
       await firebase.app.ref('usuarios').child(uid).child('Favoritos').once('value',(snapshot)=> {
         
          
          snapshot.forEach((childItem)=> {
            listfavoritos=[...listfavoritos, childItem.val()]});
          
          });

          console.log(listfavoritos);
          let total = listfavoritos.length-1;
        
        
        for(let i = 0; i <= total; i++){
            console.log('i',listfavoritos[i]);
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${listfavoritos[i]}`);
          const data = await response.json();
    
         listHeroes= [...listHeroes, {
    
            id: data.id,
            name: data.name,
           
            image:data.image
          }];
        } 
        
        
    
        this.setState({allHerois:listHeroes, begin:0, favoritos:listfavoritos, loading:false});

        console.log(this.state.allHerois);
        
        
      }

     

      deleteFavoritos = async(e) => {
        console.log('e', e);
        this.setState({loading:true});
        try{
          if(e){
           await firebase.deleteFavorite(e);
          // alert("Heroi deletado dos favoritos");
           this.listAllHeroes();
          }
        }catch(error){
          alert(error.message);
      }
       
      }
   
    render(){

        return (
          <Container>
            
            {!this.state.loading ? (
              
        <div className='mainDiv'>
          {!this.state.begin &&
          <div className='listheroi'>
            
            
            
              <Row>
                {this.state.allHerois.map(item =>(
                  <Col>
                    <Card style={{ width: '18rem', border:'transparent', background:'transparent' }}>
                      <Card.Title style={{ textAlign: 'center',marginTop: '.5rem',  color: '#f70606' }}>{item.name}</Card.Title>
                      <Link to={`/HeroDetails/${item.id}`}>
                      <Card.Img variant="top" src={item.image.url} alt={item.name}  
                      style={{marginTop: '-0.8rem', marginBottom: '-1.8rem'}} />
                      </Link>
                      
                      <Card.Body>
                        <Button variant="primary" onClick={(e)=>  this.deleteFavoritos(item.id)}
                        style={{marginLeft: '-.7rem', backgroundColor: '#2b2c2d',borderColor:'#2b2c2d', boxShadow:'none'}}>
                         Excluir Favorito
                          </Button>
                      </Card.Body>
                    </Card>
                    
                  </Col>
        
              ))}
              </Row>

              
              </div>
    }

    
        </div>

        
        
           
             ):
    ( <div
         style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 height: "40px",
                 width: "100%",
                 marginTop: "30px",
                 position: 'absolute',
                 left: '50%',
                 top: '50%',
                 transform: 'translate(-50%, -50%)',
               }}
       >
         <Spinner animation="border" role="status" variant='danger'>
           <span className="sr-only">Loading...</span>
         </Spinner>
     </div>
    )
   
      }
          </Container>
          
            
        
       
        );

    }
}


export default Favoritos;
