import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";

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
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado, No próximo tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    } else {
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

    let percentGains: number;
    let percentExpenses: number;

    if (total === 0) {
      percentGains = 0;
      percentExpenses = 0;
    } else {
      percentGains = (totalGains / total) * 100;
      percentExpenses = (totalExpenses / total) * 100;
    }

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
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

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: Number(((amountRecurrent/total)* 100).toFixed(1)),
        color: "#F7931B"     
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: Number(((amountEventual/total)* 100).toFixed(1)),
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
      </Content>
    </Container>
  );
};

export default Dashboard;
