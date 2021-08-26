import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import ListMounth from '../../utils/months'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'

import {
  Container,
  Content
} from './styles'


const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const months = useMemo(() => {
    return ListMounth.map((mount, index) => {
      return {
        value: index + 1,
        label: mount,
      }
    })
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    })

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    })
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          defaultValue={monthSelected}
          onChange={e => setMonthSelected(e.target.value)}
        />
        <SelectInput
          options={years}
          defaultValue={yearSelected}
          onChange={e => setYearSelected(e.target.value)}
        />

      </ContentHeader>

      <Content>
        <WalletBox
          color="#4E41F0"
          title="saldo"
          amount={150.00}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="dolar" />

        <WalletBox
          color="#F7931B"
          title="entradas"
          amount={5000.00}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowUp" />

        <WalletBox
          color="#E44C4E"
          title="saídas"
          amount={4850.00}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowDown" />

        <MessageBox
          title="Muito bem!"
          description="Sua carteira está positiva"
          footerText="Continue assim. Considere investir o seu saldo"
          icon={happyImg}
        />

      </Content>

    </Container>
  )
}

export default Dashboard;