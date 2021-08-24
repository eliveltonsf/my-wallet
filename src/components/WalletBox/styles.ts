import styled from 'styled-components'

interface IContainerProps {
  color: string;
}

export const Container = styled.div<IContainerProps>`
  width: 32%;
  height: 150px;
  margin: 10px 0;
  background-color: ${props => props.color};
  color: ${props => props.theme.colors.white};
  border-radius: 7px;
  padding: 10px 20px;

  position: relative;
  overflow: hidden ;

  >img{
    top: -10px;
    right: -28px;
    height: 110%;
    position: absolute;
    opacity: 30%;
  }

  >span{
    font-size: 18px;
    font-weight: 500;
  }

  >small{
    bottom: 10px;
    font-size: 12px;
    position: absolute;
  }
`;