import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import ExpensesService from "../../services/ExpensesService";
import IncomesService from "../../services/IncomesService";

function LineChart() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [data, setData] = useState([]);

  let months = [
    "sausis",
    "vasaris",
    "kovas",
    "balandis",
    "gegužė",
    "birželis",
    "liepa",
    "rugpjūtis",
    "rugsėjis",
    "spalis",
    "lapkritis",
    "gruodis",
  ];

  const [category, setCategory] = useState({
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: true,
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    type: "datetime",
    categories: [],
    labels: {
      show: true,
      align: "right",
      minWidth: 0,
      maxWidth: 160,
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          data,
        },
      },
    },
  });

  function sumByMonth(money) {
    let sumByMonth = [];
    months.forEach((month, index) => {
      let sum = 0;
      money.forEach((d) => {
        if (new Date(d.date1).getMonth() === index) {
          sum += Number(d.amount);
        }
      });
      sumByMonth = [...sumByMonth, sum];
    });
    return sumByMonth;
  }

  useEffect(() => {
    ExpensesService.getAllExpenses()
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    IncomesService.getAllIncomes()
      .then((response) => {
        setIncomes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setCategory({
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: true,
        },
      },
      legend: {
        show: true,
      },

      stroke: {
        curve: "smooth",
      },

      xaxis: {
        style: {
          fontsize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },

        categories: months,
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    });
    setData([
      {
        name: "Išlaidos",
        data: sumByMonth(expenses),
        offsetY: 0,
      },
      {
        name: "Pajamos",
        data: sumByMonth(incomes),
        offsetY: 0,
      },
    ]);
  }, [expenses, incomes]);

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={category}
          series={data}
          type="area"
          height={350}
        />
      </div>
    </>
  );
}

export default LineChart;
