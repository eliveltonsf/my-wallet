import styled from 'styled-components';

interface ILendendProps {
  color: string;
}

export const Container =  styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 7px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  >h2{
      margin-bottom: 20px;
      padding-left: 18px;

      
    }
    @media(max-width: 1200px)  {
      flex-direction: column;
    }
   
`;

export const LegendContainer =  styled.ul`
  list-style: none;
  display: flex;

  max-height: 175px;
  padding-right:15px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb{
   background-color: ${props => props.theme.colors.secondary};
   border-radius: 10px;
  }

  ::-webkit-scrollbar-track{
   background-color: ${props => props.theme.colors.tertiary};
  }
`;

export const Legend =  styled.li<ILendendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  margin-left: 18px;

  >div{
    background-color: ${props=> props.color};

    width: 40px;
    height: 40px;
    border-radius: 5px;

    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  >span{
    margin-left: 5px;
  }

  @media(max-width: 1280px)  {
    >div{
      width: 30px;
      height: 30px;
    }
  }
`;

export const ChartContainer =  styled.div`
   flex: 1;
    height: 260px;
`;
