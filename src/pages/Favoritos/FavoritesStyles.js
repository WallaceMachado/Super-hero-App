import styled, {keyframes, css}  from 'styled-components';

export const ContainerWelcome = styled.div` 
    
   Form{
       
       
    Form.Row{
        background: #2b2c2d;
        Col{
            padding-top:20px;
            padding-bottom: 20px;

            Button{
                background: #2b2c2d;
                border-color:#2b2c2d;
                box-shadow:none; 
            }
        }


    }
   }

    a{color: #fff;
    text-decoration: none;
    font-size: 23px;}

    img{
    
        width: 25%;
        
        margin: 0 auto;
        padding: 0 30px;
        height: 72px;
        display: flex;
        
        
    }
`;

export const PageActions = styled.div`
  display:flex;
  align-items:center;
  justify-content: space-between;

  button{
    outline:0;
    border:0;
    background: #222;
    color: #FFF;
    padding: 0px 0px;
    border-radius: 4px;

    &:disabled{
      cursor: not-allowed;
      opacity: 0.5;
    }
    
  }

  h3{color: #fff;
    text-decoration: none;
    
    font-size: 10px;}

`;