import styled, {keyframes, css}  from 'styled-components';

export const ContainerHeader = styled.div` 
    
    background: ${props => props.background};
    color: #800404;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    height: 72px;

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