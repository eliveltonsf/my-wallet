import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'
import PieChart from '../../components/PieChart'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import ListMounth from '../../utils/months'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'

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

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }
    });

    return total;

  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }
    });

    return total;

  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que deveria.",
        footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg
      }
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado, No próximo tente poupar o seu dinheiro.",
        icon: grinningImg
      }
    } else {
      return {
        title:"Muito bem!",
        description:"Sua carteira está positiva",
        footerText:"Continue assim. Considere investir o seu saldo",
        icon:happyImg
      }
    }
  }, [totalBalance])

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
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="dolar" />

        <WalletBox
          color="#F7931B"
          title="entradas"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowUp" />

        <WalletBox
          color="#E44C4E"
          title="saídas"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowDown" />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChart/>

      </Content>

    </Container>
  )
}

export default Dashboard;