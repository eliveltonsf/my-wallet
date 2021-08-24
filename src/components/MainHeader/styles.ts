import styled from 'styled-components'

export const Container = styled.div`
  grid-area: MH;
  
  background-color: ${props => props.theme.colors.secondary};

  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 10px;
  /* border-bottom: 1px solid ${props => props.theme.colors.gray}; */
  box-shadow:3px 3px 3px rgba(0,0,0,0.5);
  z-index:1;
`;

export const Profile = styled.div`
color: ${props => props.theme.colors.white};
`;
export const Welcome = styled.h3`

`;
export const UserName = styled.span`

`;
