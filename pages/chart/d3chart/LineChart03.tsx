import React from "react";
import * as d3 from "d3";
import Header from "../../../src/components/layout/header";
import { useEffect } from "react";
import { useState } from "react";
import LineChartXRange from "../../../src/components/chart/linechart_xrange";

export default function LineChart() {
  const [lineData, setLineData] = useState({
    data: undefined,
  });

  const url =
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";

  //Read the data
  const dataUrl = () => {
    d3.csv(url).then((res) => {
      console.log(res);
      setLineData({
        ...lineData,
        data: res.map((it) => {
          return { date: d3.timeParse("%Y-%m-%d")(it.date), value: it.value };
        }),
      });
    });
  };

  useEffect(() => {
    dataUrl();
  }, []);

  return (
    <div>
      <Header title="D3 BARCHART" />
      <div>
        <div className="chart-set">
          <LineChartXRange
            margin={{ top: 10, right: 30, bottom: 30, left: 60 }}
            data={lineData.data}
            name="line-chart04"
          />
        </div>
      </div>
    </div>
  );
}
