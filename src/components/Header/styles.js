import styled, {keyframes, css}  from 'styled-components';

export const ContainerHeader = styled.div` 
    
    background: ${props => props.background};
    color: #800404;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    height: 72px;
`;