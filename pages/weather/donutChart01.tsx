import * as d3 from "d3";
import React from "react";
import Header from "../../src/components/layout/header";
import { useEffect } from "react";
import DonutChartBasic from "../../src/components/chart/donutChart-basic";

export default function DonutChartPage() {
  return (
    <div>
      <Header title="D3 BARCHART" />
      <div className="d-flex">
        <div className="chart-set">
          <DonutChartBasic
            name="donut-chart01"
            size={{ width: 450, height: 450, margin: 40 }}
            data={{ a: 5, b: 35, c: 12, d: 11, e: 8 }}
            color={["#26c1f0", "#61a6d4", "#083263", "#3d65e9", "#0853a8"]}
          />
          <div id="donut-chart"></div>
        </div>
      </div>
    </div>
  );
}
