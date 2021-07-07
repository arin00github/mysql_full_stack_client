import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import * as _ from "lodash";
import Header from "../../../src/components/layout/header";
import { Row, Col } from "react-bootstrap";

export default function EChartPie() {
  const [count, setCount] = useState(0);
  const option3 = {
    title: {
      text: "한달지출내역서",
      subtext: "2021년 6월 내역",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["저금(적금,주식)", "주거비", "식비", "쇼핑", "문화생활"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "저금(적금,주식)" },
          { value: 310, name: "주거비" },
          { value: 234, name: "식비" },
          { value: 135, name: "쇼핑" },
          { value: 1548, name: "문화생활" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  function onChartReady(echarts) {
    console.log("echarts is ready", echarts);
  }
  function onChartClick(param, echarts) {
    console.log(param, echarts);
    setCount(count + 1);
  }
  function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts);
  }

  useEffect(() => {
    console.log("useEffect!");
  }, []);
  return (
    <div style={{ padding: "0 100px" }}>
      <Header title="EChart Pie" />
      <div>
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div className="chart-set">
              <ReactECharts
                option={option3}
                style={{ height: 400 }}
                onChartReady={onChartReady}
                onEvents={{
                  click: onChartClick,
                  legendselectchanged: onChartLegendselectchanged,
                }}
              />
              <div>Click Count: {count}</div>
              <div>Open console, see the log detail.</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
