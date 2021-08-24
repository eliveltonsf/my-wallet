import styled from 'styled-components'

export const Container = styled.div`
  grid-area: AS;

  background-color: ${props => props.theme.colors.secondary};
  padding-left: 20px;
  box-shadow:3px 3px 3px rgba(0,0,0,0.5);
  z-index:2;
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;

`;

export const LogImg = styled.img`
  height: 40px;
  width: 40px;
`;

export const Title = styled.h3`
  color: ${props => props.theme.colors.white};
  margin-left: 10px;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;

  margin-top:50px;
`;

export const MenuItemLink = styled.a`
  display: flex;
  align-items:center;
  color: ${props => props.theme.colors.info};
  text-decoration: none;

  margin: 7px 0;

  transition: opacity .3s;

  &:hover{
    opacity: 0.7;
  }

  > svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;


