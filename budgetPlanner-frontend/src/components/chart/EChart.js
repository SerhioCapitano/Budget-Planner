
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import React, { useState, useEffect, C} from 'react';
import ExpensesService from '../../services/ExpensesService'
import IncomesService from '../../services/IncomesService'

function EChart() {
  const { Title, Paragraph } = Typography;


  useEffect(() => { 
    const expenses_date = [];
    const expenses_amount =[];
    ExpensesService.getAllExpenses().then((response) => {
      console.log("response", response)
      response.data.map(item => {
        console.log("item", item)
        expenses_date.push(item.date1);
        expenses_amount.push(item.amount);
      })
        setCategory({chart: {
          type: "bar",
          width: "100%",
          height: "auto",
    
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 5,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        grid: {
          show: true,
          borderColor: "#ccc",
          strokeDashArray: 2,
        },
        xaxis: {
          categories: 
            expenses_date
          ,
          labels: {
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
              ],
            },
          },
        },
      })
      setData([{
        name: "Išlaidos",
        data: expenses_amount,
        color: "#fff",
      }])

      console.log("expenses_date", expenses_date)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const [data, setData] = useState([]);
  
   const [category, setCategory] = useState({
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return "€ " + val;
          },
        },
      },
    });

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={category}
          series={data}
          type="bar"
          height={400}
        />
      </div>
     
    </>
  );
}

export default EChart;








 {/* <div className="chart-vistior">
        <Title level={5}>Active Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}