import React from 'react';
import CountUp from 'react-countup';

import dolarImg from '../../assets/dolar.svg'
import arrowUpImg from '../../assets/arrow-up.svg'
import arrowDownImg from '../../assets/arrow-down.svg'

import { Container } from './styles';

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: 'dolar' | 'arrowUp' | 'arrowDown';
  color: string;

}

const iconList: { [key: string]: any } = {
  dolar: dolarImg,
  arrowUp: arrowUpImg,
  arrowDown: arrowDownImg,
}

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}) => {

  const IconSelected = getKeyValue(iconList)(icon as string);
  
  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <CountUp duration={1.75} end={amount} prefix={"R$ "} separator="." decimal="," decimals={2} />
      </h1>
      <small>{footerLabel}</small>
      <img src={IconSelected} alt={title} />
    </Container>
  );
}

export default WalletBox;