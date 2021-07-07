import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import * as _ from "lodash";
import Header from "../../../src/components/layout/header";
import { Row, Col } from "react-bootstrap";

export default function EChartBar() {
  const option4 = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  return (
    <div style={{ padding: "0 100px" }}>
      <Header title="EChart Bar" />
      <div>
        <Row>
          <Col>
            <div className="chart-set">
              <ReactECharts
                option={option4}
                style={{ height: 400 }}
                opts={{ renderer: "svg" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
