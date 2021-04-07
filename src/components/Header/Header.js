import React from 'react';
import {Link} from 'react-router-dom';
import './header.css'
import File from '../../Marvel.jpg';


function Header(){
        return(

          
            <header id="main-header">
                <div className="header-content">
                <Link to= "/Favoritos">
                    Favoritos
                </Link> 
                <Link to= "/Welcome">
                <img src={File} alt="logo"/>
                </Link> 
                
                <Link to= "/">
                    Sair
                </Link> 

            
                </div>
            </header>
        );
    }


export default Header; 