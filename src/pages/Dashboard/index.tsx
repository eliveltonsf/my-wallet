import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import ListMounth from '../../utils/months'

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
    </Container>
  )
}

export default Dashboard;