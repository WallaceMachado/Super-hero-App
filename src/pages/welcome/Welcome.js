import React, { Component }from 'react';
import { NavItem, Form, Col, Button, Container, Row, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './welcome.css';
import firebase from '../../firebase'

class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {
            allHerois: [],
            searchText:'',
            begin:1,
            idHeroi:'',
            favoritos:[],
            buttonPesquisar:true
            
        }
        this.listAllHeroes = this.listAllHeroes.bind(this);
        this.searchSuperHeroes = this.searchSuperHeroes.bind(this);
        this.addFavoritos = this.addFavoritos.bind(this);
    }

    componentDidMount(){
      if(!firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
    }

    firebase.getUserName((info)=>{
        
        localStorage.nome = info.val().nome;
        this.setState({name: localStorage.nome});
    })
        if(this.state.begin){
        this.listAllHeroes();
        }
        console.log('favoritos',localStorage.getItem('favoritos'));
        
    }

    listAllHeroes = async() => {
        let listHeroes = [];
    
        let total = 12;
        for(let i = 1; i <= total; i++){
          const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/${i}`);
          const data = await response.json();
    
         listHeroes= [...listHeroes, {
    
            id: data.id,
            name: data.name,
            powerstats: data.powerstats,
            biography: data.biography,
            appearance: data.appearance,
            work: data.work,
            connections: data.connections,
            image:data.image
          }];
        }            
    
        this.setState({allHerois:listHeroes, searchText:'', buttonPesquisar: true});

        console.log(listHeroes);
        
        
      }

       searchSuperHeroes = async() => {
           
        const response = await fetch(`https://www.superheroapi.com/api.php/5149633008444012/search/${this.state.searchText}`);
        const data = await response.json();
        this.setState({begin:0});
        console.log(data.results);
        this.setState({allHerois:data.results, buttonPesquisar:false});

        
      }

       addFavoritos =async(e) => {
        console.log('e', e);
        try{
          if(e){
           await firebase.addFavorite(e);
           alert("adicionado aos Favoritos");
          }
        }catch(error){
          alert(error.message);
      }
         
        }
         
        
        
        

        
      
    
    
    


    render(){

        return (
        
          <Container>

            <div className='busca'>

              <Form>
                <Form.Row className="align-items-center">
                  <Col sm={3} className="my-1"  style={{ paddingTop:'20px', paddingBottom: '20px' }}>
                    
                    <input id="search-bar" className="form-control" type="text" value={this.state.searchText} 
                      onChange={(e) => this.setState({searchText: e.target.value})} placeholder="faça uma pesquisa"/>
                  </Col>
                
                  
                  <Col xs="auto" className="my-1" style={{ paddingTop:'20px', paddingBottom: '20px' }}>
                    {this.state.buttonPesquisar ?
                    <Button onClick={this.searchSuperHeroes}
                     style={{backgroundColor: '#2b2c2d',borderColor:'#2b2c2d', boxShadow:'none' }}>Pesquisar</Button>
                    :
                    <Button onClick={this.listAllHeroes}
                    style={{backgroundColor: '#2b2c2d',borderColor:'#2b2c2d', boxShadow:'none' }}>Limpar pesquisa</Button>
                    }
                    
                  </Col>
                </Form.Row>
              </Form>
              {/*<input type="text" value={this.state.searchText} 
                    onChange={(e) => this.setState({searchText: e.target.value})} placeholder="faça uma pesquisa"/><br/> 
  
              <button onClick={this.searchSuperHeroes}>Pesquisar</button> 
            <button onClick={this.listAllHeroes}>Listar Todos</button> */}
            </div>

            <div className='principal'>

              <Row>
                {this.state.allHerois.map(item =>(
                  <Col>
                    <Card style={{ width: '18rem', border:'transparent', background:'transparent' }}>
                      <Card.Title style={{ textAlign: 'center',marginTop: '.5rem' }}>{item.name}</Card.Title>
                      <Link to={`/HeroDetails/${item.id}`}>
                      <Card.Img variant="top" src={item.image.url} alt={item.name}  
                      style={{marginTop: '-0.8rem', marginBottom: '-1.8rem'}} />
                      </Link>
                      
                      <Card.Body>
                        <Button variant="primary" onClick={(e)=> this.addFavoritos(item.id)}
                        style={{marginLeft: '-.7rem', backgroundColor: '#2b2c2d',borderColor:'#2b2c2d', boxShadow:'none'}}>
                          Adicionar aos Favoritos
                          </Button>
                      </Card.Body>
                    </Card>
                    
                  </Col>
        
              ))}
              </Row>
            </div>
          </Container>
        );

    }
}


export default Welcome;
