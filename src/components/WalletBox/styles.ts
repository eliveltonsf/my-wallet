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

  > img{
    top: -10px;
    right: -28px;
    height: 110%;
    position: absolute;
    opacity: 30%;
  }

  > span{
    font-size: 18px;
    font-weight: 500;
  }

  > small{
    bottom: 10px;
    font-size: 12px;
    position: absolute;
  }

  > strong::after{
        content:' ';
        width: 7px;
        display:inline-block;
  }

  @media(max-width: 770px){
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 22px;

      > strong {
        display: inline-block;
        width: 100%;
        font-size: 12px;
      }
    }    
  }

  @media(max-width: 420px){
    width: 100%;

    > h1 {
      display: flex;

      strong{
        position: initial;
        width: auto;
        font-size: 22px;        
      }

      strong::after{
        content:' ';
        width: 1px;
        display:inline-block;
      }
    }   
    
  }
`;