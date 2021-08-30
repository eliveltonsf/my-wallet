import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import BarChartBox from "../../components/BarChartBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import ListMounth from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

import { Container, Content } from "./styles";
import HistoryBox from "../../components/HistoryBox";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );

  const months = useMemo(() => {
    return ListMounth.map((mount, index) => {
      return {
        value: index + 1,
        label: mount,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Neste mês não há registros de entradas ou saídas.",
        footerText: "Parece que você não fez nenhum registro no mês e ano selecionado.",
        icon: grinningImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado, No próximo tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    }  else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva",
        footerText: "Continue assim. Considere investir o seu saldo",
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains= Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses= Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0 ,
        color: "#E44C4E",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return ListMounth.map((_, month) => {
      let amountEntry = 0;
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === Number(yearSelected)) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error(
              "amountEntry is invalid. amount must be valid number"
            );
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expensesMonth = date.getMonth();
        const expensesYear = date.getFullYear();

        if (expensesMonth === month && expensesYear === Number(yearSelected)) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error(
              "amountOutput is invalid. amount must be valid number"
            );
          }
        }
      });

      return {
        monthNumber: month,
        month: ListMounth[month].substr(0, 3),
        amountEntry,
        amountOutput,
      };
    }).filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
  
      return (Number(yearSelected) === currentYear && item.monthNumber <= currentMonth) || (Number(yearSelected) < currentYear)
      
    });
  }, [yearSelected]);

  const relationExpense = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses.filter(expense => {
      const date = new Date(expense.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      return month === monthSelected && year === yearSelected
    }).forEach((expense) => {
      if(expense.frequency === 'recorrente'){
        return amountRecurrent += Number(expense.amount)
      }
      if(expense.frequency === 'eventual'){
        return amountEventual += Number(expense.amount)
      }
    });

    const total= amountRecurrent + amountEventual

    const recurrentPercent = Number(((amountRecurrent/total)* 100).toFixed(1));
    const eventualPercent = Number(((amountEventual/total)* 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B"     
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E"     
      }
    ]
  },[monthSelected, yearSelected])
  
  const relationGains = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains.filter(gain => {
      const date = new Date(gain.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      return month === monthSelected && year === yearSelected
    }).forEach((gain) => {
      if(gain.frequency === 'recorrente'){
        return amountRecurrent += Number(gain.amount)
      }
      if(gain.frequency === 'eventual'){
        return amountEventual += Number(gain.amount)
      }
    });

    const total= amountRecurrent + amountEventual

    const recurrentPercent = Number(((amountRecurrent/total)* 100).toFixed(1));
    const eventualPercent = Number(((amountEventual/total)* 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B"     
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E"     
      }
    ]
  },[monthSelected, yearSelected])


  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          defaultValue={monthSelected}
          onChange={(e) => setMonthSelected(e.target.value)}
        />
        <SelectInput
          options={years}
          defaultValue={yearSelected}
          onChange={(e) => setYearSelected(e.target.value)}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          color="#4E41F0"
          title="saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="dolar"
        />

        <WalletBox
          color="#F7931B"
          title="entradas"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowUp"
        />

        <WalletBox
          color="#E44C4E"
          title="saídas"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saídas."
          icon="arrowDown"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

        <BarChartBox title="Saídas" data={relationExpense} />

        <BarChartBox title="Entradas" data={relationGains} />
      </Content>
    </Container>
  );
};

export default Dashboard;
