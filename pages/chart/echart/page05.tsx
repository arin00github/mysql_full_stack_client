import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import * as _ from "lodash";
import Header from "../../../src/components/layout/header";
import { Row, Col } from "react-bootstrap";

export default function EChartMap() {
  return (
    <div style={{ padding: "0 100px" }}>
      <Header title="EChart Map" />
      <div>
        <Row>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}
