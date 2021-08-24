import React, { useMemo, useState, useEffect } from 'react';

import {
  Container,
  Content,
  Filters
} from './styles'

import {
  ContentHeader,
  SelectInput,
  HistoryFinanceCard
} from '../../components'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import ListMounth from '../../utils/months'

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: number;
  description: string;
  amountFormated: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual'])

  const movimentType = match.params.type;

  const typePageRender = useMemo(() => {
    return movimentType === 'entry-balance' ?
      {
        title: 'Entradas',
        lineColor: '#f7931b',
        listData: gains
      } :
      {
        title: 'Saídas',
        lineColor: '#e44c4e',
        listData: expenses
      }
  }, [movimentType])

  const months = useMemo(() => {
    return ListMounth.map((mount, index) => {
      return {
        value: index + 1,
        label: mount,
      }
    })

  }, [])

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    typePageRender.listData.forEach(item => {
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

  }, [typePageRender.listData])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency);
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected([...frequencyFilterSelected, frequency])
    }
  }

  useEffect(() => {

    const filteredDate = typePageRender.listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);

    });

    const formatedDate = filteredDate.map(item => {
      return {
        id: item.id,
        description: item.description,
        amountFormated: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : "#e44c4e"
      }
    })

    setData(formatedDate);
  }, [typePageRender.listData, monthSelected, yearSelected, frequencyFilterSelected]);

  return (
    <Container>
      <ContentHeader title={typePageRender.title} lineColor={typePageRender.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-recurrent
          ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorentes
        </button>

        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-eventual
          ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormated}
            />
          ))
        }
      </Content>
    </Container>
  )
}

export default List;